import { Input } from "@/shared/ui";
import { useFormContext, Controller } from "react-hook-form";
import styles from "./styles.module.css";

interface props {
    name: string;
    placeholder?: string;
}

export const FormInput = ({ name, placeholder }: props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={styles["input-row"]}>
                    <Input {...field} placeholder={placeholder} />
                    {!!error && (
                        <p className={styles["error-msg"]}>{error?.message}</p>
                    )}
                </div>
            )}
        ></Controller>
    );
};
