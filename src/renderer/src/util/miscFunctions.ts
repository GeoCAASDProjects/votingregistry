
export function formatDocument(document:string): string {
    let finalString = "";
    finalString += document.substring(0, 3);
    finalString += "-"+document.substring(3, 6);
    finalString += "-"+document.substring(6, 10);
    return finalString;
}