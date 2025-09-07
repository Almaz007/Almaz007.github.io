// services/configSerializer.ts
import { TScriptItem } from "../type";
import { TOutputMatrixRow } from "@/entities/outputMatrix";
import { TInputMatrixRow } from "@/entities/inputMatrix";

export function serializeScripts(scripts: TScriptItem[]): number[][] {
    return scripts.map((script) => {
        const res =
            "lengthMemory" in script
                ? [
                      script.inType,
                      script.instructionOffset,
                      script.ptrBegin,
                      script.lengthMemory,
                      ...script.resultOffsets,
                      ...script.sourcesOffsets,
                      script.workingSpace,
                  ]
                : "instructionOffset" in script
                ? [
                      script.inType,
                      script.instructionOffset,
                      ...script.resultOffsets,
                      ...script.sourcesOffsets,
                  ]
                : [
                      script.inType,
                      ...script.sourcesOffsets,
                      ...script.resultOffsets,
                  ];

        while (res.length < 10) res.push(0);
        return res;
    });
}

export function serializeConfig({
    scripts,
    instructions,
    setpoints,
    indications,
    inputMatrixData,
    sms,
    smsWeb,
    phoneNumber,
}: {
    scripts: TScriptItem[];
    instructions: number[];
    setpoints: number[];
    indications: Record<string, TOutputMatrixRow>;
    inputMatrixData: Record<string, TInputMatrixRow>;
    sms: string;
    smsWeb: string;
    phoneNumber: string;
}) {
    const scriptsArr = serializeScripts(scripts);

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
    const inputMatrix = Object.values(inputMatrixData).map(({ I, U, HRM3 }) => [
        I,
        U,
        HRM3,
    ]);

    return {
        scripts: scriptsArr,
        functions: instructions,
        setpoints,
        outputMatrix,
        inputMatrix,
        sms,
        smsWeb,
        phoneNumber,
    };
}
