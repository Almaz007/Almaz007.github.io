export type MenuItem = {
    label: string;
    action?: () => void;
    children?: MenuItem[];
    disabled?: boolean;
};

export type Menu = {
    title: string;
    items: MenuItem[];
};
