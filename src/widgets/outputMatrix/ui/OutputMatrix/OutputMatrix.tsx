import { Button, Input, Modal, Table } from "@/shared/ui";
import { TOutputMatrixRow } from "@/entities/outputMatrix";
import { useOutputMatrixBusiness } from "../../hooks/useOutputMatrixBuisness";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";

const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
};

export const OutputMatrix = () => {
    const {
        renderHead,
        renderRow,
        rows,
        smsText,
        setSms,
        smsWebText,
        setSmsWeb,
        phoneNumber,
        setPhoneNumber,
    } = useOutputMatrixBusiness();

    const [visible, setVisible] = useState(false);
    const [fieldKey, setFieldKey] = useState<"sms" | "smsWeb">("sms");

    const [formState, setFormState] = useState({
        sms: {
            title: "СМС",
            value: smsText,
        },
        smsWeb: {
            title: "udp СМС",
            value: smsWebText,
        },
        phoneNumber: phoneNumber,
    });

    const [isPhoneValid, setIsPhoneValid] = useState(true);

    useEffect(() => {
        setFormState({
            sms: { title: "СМС", value: smsText },
            smsWeb: { title: "СМС UDP", value: smsWebText },
            phoneNumber,
        });
    }, [smsText, smsWebText, phoneNumber]);

    const handleChange = (key: "sms" | "smsWeb", value: string) => {
        setFormState((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                value,
            },
        }));
    };

    const handlePhoneChange = (value: string) => {
        setFormState((prev) => ({
            ...prev,
            phoneNumber: value,
        }));
        setIsPhoneValid(validatePhoneNumber(value));
    };

    const handleSave = () => {
        const { value } = formState[fieldKey];
        const phone = formState.phoneNumber;

        if (fieldKey === "sms") {
            setSms(value);
            setPhoneNumber(phone);
        } else {
            setSmsWeb(value);
        }

        setVisible(false);
    };

    const isSaveDisabled =
        fieldKey === "sms" && !validatePhoneNumber(formState.phoneNumber);

    return (
        <div>
            <Table<TOutputMatrixRow>
                renderRow={renderRow}
                renderHead={renderHead}
                rowItems={rows}
                getRowKey={(row: TOutputMatrixRow) => row.id}
                maxWidth={1100}
            />
            <div className={styles["btns-row"]}>
                <Button
                    text="смс"
                    onClick={() => {
                        setVisible(true);
                        setFieldKey("sms");
                    }}
                />
                <Button
                    text="смс udp"
                    onClick={() => {
                        setVisible(true);
                        setFieldKey("smsWeb");
                    }}
                />
            </div>
            <Modal visible={visible} setVisible={setVisible}>
                <div className={styles["content"]}>
                    <h2 className={styles["title"]}>
                        {formState[fieldKey].title}
                    </h2>
                    <div className={styles["controlled-block"]}>
                        <div className={styles["input-row"]}>
                            <label className={styles["input-label"]}>
                                Сообщение
                            </label>
                            <Input
                                value={formState[fieldKey].value}
                                onChange={(e) =>
                                    handleChange(fieldKey, e.target.value)
                                }
                            />
                        </div>

                        {fieldKey === "sms" && (
                            <div className={styles["input-row"]}>
                                <label className={styles["input-label"]}>
                                    Номер телефона:
                                </label>
                                <Input
                                    value={formState.phoneNumber}
                                    onChange={(e) =>
                                        handlePhoneChange(e.target.value)
                                    }
                                    style={{
                                        borderColor: isPhoneValid
                                            ? undefined
                                            : "red",
                                    }}
                                />
                                {!isPhoneValid && (
                                    <span className={styles["error-text"]}>
                                        Неверный номер телефона
                                    </span>
                                )}
                            </div>
                        )}
                        <Button
                            text="Сохранить"
                            onClick={handleSave}
                            disabled={isSaveDisabled}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};
