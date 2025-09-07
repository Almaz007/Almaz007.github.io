export interface Option {
    value: string | number;
    label?: string;
}

export interface CustomSelectProps {
    options: Option[];
    value: string | number;
    onChange: (value: string | number) => void;
    label?: string;
    placeholder?: string;
}
