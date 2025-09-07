import { CustomSelect } from "@/shared/ui";
import { useTemplates } from "../../../../hooks/useTemplates";
import { templates } from "@/widgets/graphEditor/config/templates";
import { useState } from "react";

type Props = {};

export const TemplatesProject = ({}: Props) => {
    const [template, setTemplate] = useState<TKeys | "">("");
    const { templatesKeys, addNodeByTemplate } = useTemplates();
    type TKeys = keyof typeof templates;

    const labels = {
        ikz: "ИКЗ",
        rza: "РЗА",
        template1: "Шаблон икз2",
    };

    return (
        <div>
            <CustomSelect
                value={template}
                placeholder="шаблоны"
                options={templatesKeys.map((key) => ({
                    value: key,
                    label: labels[key],
                }))}
                onChange={(option: string | number) => {
                    addNodeByTemplate(option as TKeys);
                    setTemplate(option as TKeys);
                }}
            />
        </div>
    );
};
