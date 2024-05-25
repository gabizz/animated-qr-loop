import LZString from "lz-string"

export function binaryToBase64(binaryString) {
    const byteArray = new Uint8Array(binaryString.length / 8);
    for (let i = 0; i < binaryString.length; i += 8) {
        byteArray[i / 8] = parseInt(binaryString.slice(i, i + 8), 2);
    }
    let binary = '';
    const len = byteArray.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(byteArray[i]);
    }
    return btoa(binary);
}

export function base64ToBinary(base64String) {
    const binaryString = atob(base64String);
    let binaryResult = '';
    for (let i = 0; i < binaryString.length; i++) {
        const binaryChar = binaryString.charCodeAt(i).toString(2).padStart(8, '0');
        binaryResult += binaryChar;
    }
    return binaryResult;
}

export function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export function base64ToArrayBuffer(base64) {
    // Decode the Base64 string to a binary string
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    // Convert the binary string to an ArrayBuffer
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
}

export function lzCompressBase64(text) {
    console.log("text:", text)
    const compressedString = LZString.compress(text);
    // Encode the compressed string back to Base64
    return compressedString;
}

export async function downloadFile(file) {
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(fileURL);
}

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Get only the Base64 string
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

export function base64ToFile(base64, fileName, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
}

export  function fileSize(b) {
    var u = 0, s=1024;
    while (b >= s || -b >= s) {
        b /= s;
        u++;
    }
    return (u ? b.toFixed(1) + ' ' : b) + ' KMGTPEZY'[u] + 'B';
}