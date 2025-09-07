export function splitJsonIntoChunks(jsonStr: string, chunkSize = 512) {
    const encoder = new TextEncoder(); // Переводим строку в байты (UTF-8)
    const bytes = encoder.encode(jsonStr);
    const chunks = [];

    let i = 0;
    while (i < bytes.length) {
        const chunkBytes = bytes.slice(i, i + chunkSize);
        const chunkStr = new TextDecoder().decode(chunkBytes);
        chunks.push(chunkStr);
        i += chunkSize;
    }

    return chunks;
}
