export const getKeysByObj = <T extends object>(obj: T): Array<keyof T> => {
    return Object.keys(obj) as Array<keyof T>;
};
export const downloadFile = (
    fileData: string,
    fileName: string,
    mimeType: string
) => {
    const blob = new Blob([fileData], { type: mimeType });

    const link = document.createElement("a");
    link.download = fileName;

    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = function () {
        if (typeof reader.result === "string") {
            link.href = reader.result;
            link.click();
        } else {
            console.error(
                "Unexpected reader.result type:",
                typeof reader.result
            );
        }
    };
};
