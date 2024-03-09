import { useState } from "react"

import img from '../assets/test.png'

type Data = {
    [key:string]: string | number
}


export const TestPrompt = (props:any) => {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(img)

    return(
        <>
            <label>
                Type a positive prompt:
            </label>
            <form
                onSubmit={event => handleSubmit(event, prompt, setImage)}
            >
                <textarea
                    cols={30}
                    rows={10}
                    onChange={event => handleChange(event.target.value, setPrompt)}
                >

                </textarea>

                <button
                    type="submit"
                    value="Send!"
                >
                    Send!
                </button>
            </form>

            <p>
                test prompt should appear here:  
            </p>
            <p>
                {prompt}
            </p>
            
            <img src={image} alt='n/a' width={300} height={400}>

            </img>
        </>
    );
};

export const handleChange = (prompt: string, setPrompt: React.Dispatch<React.SetStateAction<string>>) => {
    setPrompt(prompt)
};


export const handleSubmit = (event:any, prompt: string | Data, setImage: Function) => {
    event.preventDefault();
    
    console.log("clicked submit")

    const body = {prompt: prompt}

    const response = fetch(
        "http://localhost:5000/diffusers",
        {
            method: "POST",  
            mode: "cors",/* "no-cors", */
            //credentials: "omit",
            headers: {
                "Content-Type": "application/json"
            },
            //redirect: "follow",
            //referrerPolicy: "no-referrer",
            body: JSON.stringify(body) 
        }
    )

        .then((response) => response.blob())
        .then((myBlob) => {
          const objectURL = URL.createObjectURL(myBlob);
          setImage(objectURL)
        });
};