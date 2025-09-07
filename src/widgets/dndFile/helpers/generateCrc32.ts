// таблица для CRC32 (один раз генерим при запуске)
const crc32Table = (() => {
    const table: number[] = [];
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
            if (c & 1) {
                c = 0xedb88320 ^ (c >>> 1);
            } else {
                c = c >>> 1;
            }
        }
        table[i] = c >>> 0;
    }
    return table;
})();

export function crc32(buffer: Buffer): number {
    let crc = 0xffffffff;
    for (let i = 0; i < buffer.length; i++) {
        const byte = buffer[i];
        crc = (crc >>> 8) ^ crc32Table[(crc ^ byte) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0; // всегда положительное число
}
