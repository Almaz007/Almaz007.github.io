import { actionConfig } from "../../config/action-config";
import { actionFactories } from "../../config/action-factories";
import { useChangeHandles } from "./useChangeHandles";
import { useInverseNode } from "./useInverseNode";
import { TNodeData } from "@/entities/editor";
import { ActionDependencies } from "../types";
import {
    useUpdateFourierValue,
    useUpdateSetpointValue,
} from "@/shared/model/setpoint";
import { TMenuAction } from "../types";
import { useUpdateNameValue } from "./useUpdateNameValue";
import { useDeleteNode } from "./useDeleteNode";
import useCopyPaste from "./useCopyPaste";
import { Node, NodeProps } from "@xyflow/react";
import { useChangeLengthMemory } from "./useChangeLengthMemory";

export const useActionFactory = (node: NodeProps<Node<TNodeData>>) => {
    const { type } = node.data;

    const dependencies: ActionDependencies = {
        useChangeHandles,
        useInverseNode,
        useUpdateSetpointValue,
        useUpdateNameValue,
        useDeleteNode,
        useUpdateFourierValue,
        useCopyPaste,
        useChangeLengthMemory,
    };

    const actions = actionConfig[type]?.map((actionKey) => {
        const factory = actionFactories[actionKey];
        if (!factory) return null;

        const requiredDeps = factory.dependencies.reduce<ActionDependencies>(
            (acc, depKey) => {
                if (depKey in dependencies) {
                    //@ts-ignore
                    acc[depKey] = dependencies[depKey];
                }
                return acc;
            },
            {}
        );

        return {
            key: factory.key,
            label: factory.label,
            element: factory.createElement({
                node,
                dependencies: requiredDeps,
            }),
        };
    }) as TMenuAction[];

    return { actions };
};
