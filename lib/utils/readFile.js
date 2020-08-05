"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataFromReadFile = exports.readFile = void 0;
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
exports.readFile = readFile;
async function getDataFromReadFile(files) {
    return await Promise.all(Array.from(files).map((file) => readFile(file)));
}
exports.getDataFromReadFile = getDataFromReadFile;
