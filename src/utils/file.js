export const convertBase64= async (file)=>{
    return new Promise((resolver, reject)=>{
        const fileRender = new FileReader();
        fileRender.readAsDataURL(file);
        fileRender.onload = ()=>{
            resolver(fileRender.result);
        }
        fileRender.onerror = (error)=>{
            reject(error);
        }
    });
}