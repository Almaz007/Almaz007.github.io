import { useEditorStore } from "@/entities/editor";
import { TScriptItem } from "../model/type";
import { enqueueSnackbar } from "notistack";
import { useSetpoints } from "@/shared/model/setpoint";
import { useOutputMatrixStore } from "@/entities/outputMatrix";
import { useInputMatrixStore } from "@/entities/inputMatrix";
import { shallow } from "zustand/shallow";
import { useBleStore } from "@/shared/model";
import { serializeScripts } from "../model/services/configSerializer";
import {
    generateScriptRecursive,
    planOffsets,
} from "../model/services/scriptGenerator";
import { createInstructionsBuffer } from "../model/services/scriptGenerator";
import { generateOffsetsMemory } from "../helpers/generateOffsetsMemory";
import { TOffsetsStore } from "../model/type";
import { TYPE_SIZES } from "../constants/constants";
import { splitJsonIntoChunks } from "../helpers/splitJsonStr";
import { useConfigStore } from "@/entities/config";
import { useAnalyzerStore } from "@/entities/analyzer";

export const useSaveConfig = () => {
    const [nodes, edges] = useEditorStore(
        (state) => [state.nodes, state.edges],
        shallow
    );

    const sendConfig = useBleStore((state) => state.sendConfig);

    const { setpointsValues } = useSetpoints((state) => ({
        setpointsValues: state.setpointsValues,
    }));

    const [indications, smsText, smsWebText, phoneNumber] =
        useOutputMatrixStore(
            (state) => [
                state.indications,
                state.smsText,
                state.smsWebText,
                state.phoneNumber,
            ],
            shallow
        );

    const offsetsOsc = useAnalyzerStore(
        (state) => state.oscillographicOffsets,
        shallow
    );

    const inputMatrixData = useInputMatrixStore(
        (state) => state.datas,
        shallow
    );

    const generateOffsets = (): Record<string, TOffsetsStore> => {
        const offsetsStore = {
            bool: [],
            int: [],
            float: [],
            analog: [],
        };
        const setpointOffsetsStore = {
            bool: [],
            int: [],
            float: [],
            analog: [],
        };
        const outputOffsetsStore = {
            bool: [],
            int: [],
            float: [],
            analog: [],
        };
        const analogInputsOffsets = {
            bool: [],
            int: [],
            float: [],
            analog: [],
        };

        nodes.forEach((node) => {
            Object.values(node.data.outputHandles).forEach((out) => {
                generateOffsetsMemory(out.dataType, offsetsStore);

                if (
                    node.data.type.toLocaleLowerCase().includes("fifo") &&
                    "lengthMemory" in node.data
                ) {
                    const lengthMemory = node.data.lengthMemory;
                    const dataType = Object.values(node.data.outputHandles)[0]
                        .dataType;

                    const size = lengthMemory * TYPE_SIZES[dataType];

                    generateOffsetsMemory(out.dataType, offsetsStore, size); //смещение для памяти фифо
                    generateOffsetsMemory("int", offsetsStore); // смещения для рабочей области
                }
            });
            // if ("setpointDataType" in node.data) {
            //     generateOffsetsMemory(
            //         node.data.setpointDataType,
            //         setpointOffsetsStore
            //     );
            // }

            if (node.data.type === "analogInput") {
                generateOffsetsMemory(
                    "analog",
                    analogInputsOffsets,
                    undefined,
                    {
                        bool: 1,
                        int: 4,
                        float: 4,
                        analog: 80,
                    }
                );
            }

            if (node.data.type.toLocaleLowerCase().includes("output")) {
                generateOffsetsMemory(
                    node.data.inputHandles["input"].dataType,
                    outputOffsetsStore
                );
            }
        });

        return {
            offsets: {
                bool: [...offsetsStore["bool"]],
                int: [...offsetsStore["int"]],
                float: [...offsetsStore["float"]],
                analog: [...offsetsStore["analog"]],
            },
            setpointOffsets: {
                bool: [...setpointOffsetsStore["bool"]],
                int: [...setpointOffsetsStore["int"]],
                float: [...setpointOffsetsStore["float"]],
                analog: [...setpointOffsetsStore["analog"]],
            },
            outputOffsetsStore: {
                bool: [...outputOffsetsStore["bool"]],
                int: [...outputOffsetsStore["int"]],
                float: [...outputOffsetsStore["float"]],
                analog: [...outputOffsetsStore["analog"]],
            },
            analogInputsOffsets: {
                bool: [...analogInputsOffsets["bool"]],
                int: [...analogInputsOffsets["int"]],
                float: [...analogInputsOffsets["float"]],
                analog: [...analogInputsOffsets["analog"]],
            },
        };
    };

    const generateScriptsInstructions = (
        offsets: TOffsetsStore,
        setpointOffsets: TOffsetsStore,
        outputOffsetsStore: TOffsetsStore,
        analogInputsOffsets: TOffsetsStore
    ) => {
        const scripts: TScriptItem[] = [];
        const visited = new Set<string>();
        const buffer = createInstructionsBuffer();

        const outputNodes = nodes.filter((n) =>
            n.data?.type.toLowerCase().includes("output")
        );

        if (!outputNodes.length) throw new Error("Нет выходных элементов");

        const { handleOffsetsMap, outputOffsetsMap } = planOffsets(
            nodes,
            offsets,
            outputOffsetsStore
        );

        outputNodes.forEach((node) =>
            generateScriptRecursive(
                node,
                visited,
                scripts,
                buffer,
                offsets,
                handleOffsetsMap,
                setpointOffsets,
                outputOffsetsMap,
                analogInputsOffsets,
                nodes,
                edges
            )
        );

        return { scripts, instructions: buffer.instructions };
    };

    const calculateConfig = async () => {
        try {
            const { setConfig } = useConfigStore.getState();
            const {
                offsets,
                setpointOffsets,
                outputOffsetsStore,
                analogInputsOffsets,
            } = generateOffsets();

            console.log("смещения", offsets);
            console.log("смещения уставок", setpointOffsets);
            console.log("смещения для выходов", outputOffsetsStore);
            console.log("смещения для входов аналоговых", outputOffsetsStore);

            const { scripts, instructions } = generateScriptsInstructions(
                offsets,
                setpointOffsets,
                outputOffsetsStore,
                analogInputsOffsets
            );

            console.log("смещения", offsets);
            console.log("смещения уставок", setpointOffsets);
            console.log("смещения для выходов", outputOffsetsStore);

            // @ts-ignore
            setConfig({ scripts, instructions });
        } catch (error) {
            enqueueSnackbar(
                error instanceof Error ? error.message : "Ошибка сохранения",
                { variant: "error" }
            );
            throw error;
        }
    };
    const sendResConfig = () => {
        const { config } = useConfigStore.getState();

        let offsetsForOscillographic: { length: number; offset: number }[] = [];
        Object.entries(offsetsOsc).forEach((off) => {
            // if (off[1].send) {
            // }
            offsetsForOscillographic.push({
                length: off[1].lengthMemory,
                offset: Number(off[0]),
            });
        });

        const outputMatrix = Object.values(indications).map(
            ({ led1, led2, led3, blOn, blOff, sms, smsWeb }) => [
                led1,
                led2,
                led3,
                blOn,
                blOff,
                sms,
                smsWeb,
            ]
        );
        const inputMatrix = Object.values(inputMatrixData).map(
            ({ I, U, HRM3 }) => [I, U, HRM3]
        );
        const configForSend = {
            //@ts-ignore
            scripts: serializeScripts(config.scripts),
            functions: config.instructions,
            setpoints: setpointsValues,
            inputMatrix,
            outputMatrix,
            sms: smsText,
            smsWeb: smsWebText,
            phoneNumber,
            offsetsOsc: offsetsForOscillographic,
        };
        console.log(configForSend);

        const chunks = splitJsonIntoChunks(JSON.stringify(configForSend), 512);
        chunks.forEach((chunk, idx) =>
            setTimeout(() => sendConfig(chunk), idx * 1000)
        );
    };
    return { calculateConfig, sendResConfig };
};
