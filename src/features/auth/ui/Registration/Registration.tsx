import { useForm, FormProvider } from "react-hook-form";
import {
    registrationSchema,
    registrationSchemaType,
} from "../../model/registration-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../FromInput/FormInput";
import { Button } from "@/shared/ui";
import styles from "./styles.module.css";
import { CustomSelect } from "@/shared/ui/customSelect/CustomSelect";
import { useState } from "react";

export const Registration = () => {
    const [selectedOption, setSelectedOption] = useState<string>("");

    const methods = useForm<registrationSchemaType>({
        mode: "onChange",
        resolver: zodResolver(registrationSchema),
        defaultValues: { userName: "", password: "", confirmPassword: "" },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: registrationSchemaType) => {
        console.log(data);
    };
    const options = [
        { value: "Инженер", label: "Инженер" },
        { value: "Оперативный персонал", label: "Оперативный персонал" },
        { value: "Администратор", label: "Администратор" },
    ];
    return (
        <FormProvider {...methods}>
            <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
                <FormInput name="userName" placeholder="введите свое имя" />
                <FormInput name="password" placeholder="введите пароль" />
                <FormInput
                    name="confirmPassword"
                    placeholder="повторите пароль"
                />
                <CustomSelect
                    options={options}
                    value={selectedOption}
                    onChange={(value: string) => setSelectedOption(value)}
                    placeholder="Выберите роль"
                />
                <Button type="submit" text="Зарегистрироваться" />
            </form>
        </FormProvider>
    );
};
