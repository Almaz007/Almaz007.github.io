export function splitIntToBytes(number: number) {
    const byteArray = new Uint8Array(4); // Создаем массив для 4 байтов

    byteArray[3] = (number >> 24) & 0xff; // Старший байт
    byteArray[2] = (number >> 16) & 0xff; // Второй байт
    byteArray[1] = (number >> 8) & 0xff; // Третий байт
    byteArray[0] = number & 0xff; // Младший байт
    return byteArray;
}

export function splitFloatToBytes(number: number) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, number); // Используйте setFloat64 для double-precision
    return new Uint8Array(buffer);
}

export function combineBytesToFloat(byteArray: number[]): number {
    if (byteArray.length !== 4) {
        throw new Error("Массив должен содержать ровно 4 байта");
    }

    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    // Записываем байты в буфер (порядок зависит от endianness)
    byteArray.forEach((byte, index) => {
        view.setUint8(index, byte);
    });

    // Читаем как 32-битный float
    return view.getFloat32(0);
}

export function combineBytesToInt(byteArray: number[]) {
    if (byteArray.length !== 4) {
        throw new Error("Массив должен содержать ровно 4 байта");
    }

    return (
        (byteArray[3] << 24) | // Старший байт
        (byteArray[2] << 16) | // Второй байт
        (byteArray[1] << 8) | // Третий байт
        byteArray[0] // Младший байт
    );
}
