import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

type Option = {
    label: string;
    value: string;
};

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    const handleOptionClick = (option: Option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            selectRef.current &&
            !selectRef.current.contains(e.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={selectRef} className={styles["selectWrapper"]}>
            <div onClick={toggleOpen} className={styles["select"]}>
                {selectedOption ? selectedOption.label : placeholder}
            </div>

            {isOpen && (
                <div className={styles["dropdown"]}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className={`${styles["option"]} ${
                                option.value === value
                                    ? styles["selectedOption"]
                                    : ""
                            }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
