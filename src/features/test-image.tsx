import { useRef, useState } from "react";
import placeholderImage from "../assets/test.png" 

function TestImage(props: any) {
    const [imageFile, setImageFile] = useState<File>(new File([], placeholderImage));//"pseudo-empty-image"));
    //const [prompt, setPrompt] = useState("a picture of Wonder Woman holding her whip, front view, full body, selfie, cosplay, realistic");
    const [prompt, setPrompt] = useState("a picture of Batman running, front view, full body, cosplay, realistic");
    //const inputFile = useRef<HTMLInputElement>(null);

    const [selfie, setSelfie] = useState(placeholderImage)


    return (
        <>
            <label>Pick an image</label>
            <form
                onSubmit={handleSubmit(imageFile, setSelfie, prompt)}
            >
                <input
                    onChange={handleUpload(setImageFile, setSelfie)}
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

            <img 
                src={selfie}
                alt={placeholderImage}
                width={768}
                height={768}
            >
            
            </img>
        </>
    )
}

export const handleOpenFilePicker = (inputFile: React.RefObject<HTMLInputElement>) => {
    if(inputFile.current)
        inputFile.current.click()    
}

export const handleUpload = (setImageFile: React.Dispatch<React.SetStateAction<File>>, setSelfie: Function/* React.Dispatch<React.SetStateAction<string>> */) => { //not upload to the server yet, upload to client form disk
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("INSIDE HANDLE-UPLOAD")
        console.log("EVENT TARGET FILES:   ", event.target.files)
        console.log("files len:   ", event.target.files?.length)
        const files = event.target.files
        if(files){
            console.log("CHECK PASSED, file 0 is:   ", files[0])
            setImageFile(files[0]);
            const fileReader = new FileReader()
            fileReader.onload = (readerEvent) =>{
                const image = fileReader.result//readerEvent.target;
                if(image){
                    const img = new Image()
                    img.src = fileReader.result as string
                    setSelfie(img.src)
                }
            }
            fileReader.readAsDataURL(files[0])
        }
    }
}

export const handleSubmit = (image: File, setSelfie: Function, prompt: string) => { //File extends Blob
    return (event: any) => {
        event.preventDefault();

        //const body = {image: image}
        const data = new FormData();
        data.append("prompt", prompt);
        //data.append("image", JSON.stringify(image));
        data.append("image", image);

        console.log(data)

        /* const response =  */fetch(
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
            // .then(response => response.json())
            // .then(json =>{
            //     console.log(`++++++++++++++\n response type:   \n ${json["data"]} \n+++++++++++++`)
            //     setSelfie(`data:image/png:base64,${json["data"]};`)
            // })





            .then(response => {
                setSelfie("http://localhost:5000/diffusers/inpaint")
                console.log(response)
            })





            // .then(response => {
            //     let reader = new FileReader();
            //     let blob;
            //     reader.onload = (event) => {
            //         blob = new Blob([response as unknown as BlobPart], {type: "image/png"})
            //         event.target && setSelfie(event.target.result);

            //         reader.readAsDataURL(blob)
            //     }
            //     //reader.readAsDataURL(blob)
            // })

    }
}

export default TestImage
