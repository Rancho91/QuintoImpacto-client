

export default function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const baseUrl = reader.result.split(",")[1];
                resolve(baseUrl);
            };
            reader.onerror = error => reject(error);
        } else {
            reject("No se proporcionó ningún archivo.");
        }
    });
}