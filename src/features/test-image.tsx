import { useRef, useState } from "react";


function TestImage(props: any) {
    const [image, setImage] = useState<File>(new File([], "pseudo-empty-image"));
    const [prompt, setPrompt] = useState("");
    //const inputFile = useRef<HTMLInputElement>(null);


    return (
        <>
            <label>Pick an image</label>
            <form
                onSubmit={handleSubmit(image, prompt)}
            >
                <input
                    onChange={handleUpload(setImage)}
                    type="file"
                    accept="image/jpeg"
                    name="Browse"
                    //ref={inputFile}
                    //style={{display: "none"}}
                />
                <button
                    type="submit"
                    value="Send!"
                >
                    Send!
                </button>
            </form>
        </>
    )
}

export const handleOpenFilePicker = (inputFile: React.RefObject<HTMLInputElement>) => {
    if(inputFile.current)
        inputFile.current.click()    
}

export const handleUpload = (setImage: React.Dispatch<React.SetStateAction<File>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("INSIDE HANDLE-UPLOAD")
        console.log("EVENT TARGET FILES:   ", event.target.files)
        console.log("files len:   ", event.target.files?.length)
        if(event.target.files){
                console.log("CHECK PASSED, file 0 is:   ", event.target.files[0])
            setImage(event.target.files[0]);
        }
    }
}

export const handleSubmit = (image: File, prompt: string) => { //File extends Blob
    return (event: any) => {
        event.preventDefault();

        //const body = {image: image}
        const data = new FormData();
        data.append("prompt", prompt);
        //data.append("image", JSON.stringify(image));
        data.append("image", image);

        console.log(data)

        const response = fetch(
            "http://localhost:5000/diffusers/inpaint", 
            {
                method: "POST",  
                mode: "cors",
                // headers: {
                //     "Content-Type": "image/jpeg"
                // },    
                body: data
            }
        )
    }
}

export default TestImage
