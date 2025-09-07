import { useForm, FormProvider } from "react-hook-form";
import { loginSchema, loginSchemaType } from "../../model/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../FromInput/FormInput";
import { Button } from "@/shared/ui";
import styles from "./styles.module.css";
import { Link } from "react-router";

export const Login = () => {
    const methods = useForm<loginSchemaType>({
        mode: "onChange",
        resolver: zodResolver(loginSchema),
        defaultValues: { userName: "", password: "" },
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: loginSchemaType) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
                <FormInput name="userName" placeholder="введите свое имя" />
                <FormInput name="password" placeholder="введите пароль" />
                <div className={styles["form-footer"]}>
                    <Link to={"/terminal"} className={styles["text"]}>
                        войти как гость?
                    </Link>
                    <Button type="submit" text="войти" />
                </div>
            </form>
        </FormProvider>
    );
};
