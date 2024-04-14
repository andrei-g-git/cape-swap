import { useState, useEffect } from "react"
import Panel from "./panel"
import placeholderImage from '../assets/test.png'
import "./panels.css";

function Panels(props: any) {

    const [imageFile, setImageFile] = useState<File>(new File([], placeholderImage));
    const [prompt, setPrompt] = useState('a picture of a superhero, frontal view, full body shot, realistic, ultra realistic, high quality');
    const [negative, setNegative] = useState("bad hands, bad anatomy, cartoon, anime, cgi");
    const [selfie, setSelfie] = useState(placeholderImage); //i made react reload all sort of stuff so I shouldn't use a one-size-fits-all state for both the uploaded image and response image
    const [uploaded, setUploaded] = useState(false);
    const [gotInference, setGotInference] = useState(false);

    useEffect(() => {
        console.log("uploaded:  ", uploaded)
        console.log("selfie:  ", selfie)
    },
        [uploaded]
    );

    return (
        <>
            {
                !gotInference? 
                    <div className="panels">
                        <Panel key={uploaded} index={1} width="25vw" height="60vh">
                            {
                                !uploaded?
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%"}} 
                                        
                                    >
                                        <label className="image-upload"
                                            htmlFor="image-upload"
                                        >

                                        </label>
                                        <input id="image-upload"
                                            type="file"
                                            accept="image/jpeg"
                                            name="serrgregsregserg"
                                            onChange={handleUpload(setImageFile, setSelfie, setUploaded)}
                                        >
                                        </input>
                                    </div>
                                :
                                    <img 
                                        src={selfie} 
                                        width="100%"
                                        height="100%"
                                    />
                            }
                        </Panel>
                        <Panel index={2} width="10vw" height="45vh"/>   
                        <Panel index={3} width="3vw" height="35vh"/>               
                    </div>

                :
                    <div className="panels">
                        <Panel index={1} width="3vw" height="35vh"/>                        
                        <Panel index={2} width="10vw" height="45vh"/>                     
                        <Panel index={3} width="25vw" height="60vh">
                            {/* <img 
                                src={selfie} 
                                width="100%"
                                height="100%"
                            /> */}
                            <div dangerouslySetInnerHTML={{__html: selfie}}/>
                        </Panel>
                    </div>
            }   

            <button onClick={handleSubmit(imageFile, setSelfie, setGotInference, prompt, negative)}> Send! </button>                
        </>
    )
}


export const handleUpload = (setImageFile: React.Dispatch<React.SetStateAction<File>>, setSelfie: Function, setUploaded: Function) => { 
    return (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event.target.files
        if(files){
            console.log("CHECK PASSED, file 0 is:   ", files[0]);
            setImageFile(files[0]);
            const fileReader = new FileReader()
            fileReader.onload = (readerEvent) =>{
                const image = fileReader.result;
                if(image){
                    const img = new Image();
                    img.src = fileReader.result as string;
                    setSelfie(img.src);
                    setUploaded(true);
                }
            }
            fileReader.readAsDataURL(files[0]);
        }
    }
}


const handleSubmit = (image: File, setSelfie: Function, setGotInference: Function, prompt: string, negative: string) => { //File extends Blob
    return (event: any) => {
        event.preventDefault();

        const data = new FormData();
        data.append("prompt", prompt);
        data.append("negative", negative)
        data.append("image", image);

        console.log(data)

        fetch(
            "http://localhost:5000/diffusers/inpaint", 
            {
                method: "POST",  
                mode: "cors",  
                body: data
            }
        )
            .then(res => res.text())
            .then(html => {
                setSelfie(html);
                setGotInference(true)
            })

    }
}


export default Panels
