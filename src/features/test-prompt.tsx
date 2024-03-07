import { useState } from "react"
import $ from "jquery"

type Data = {
    [key:string]: string | number
}


export const TestPrompt = (props:any) => {
    const [prompt, setPrompt] = useState("");

    return(
        <>
            <label>
                Type a positive prompt:
            </label>
            <form
                onSubmit={event => handleSubmit(event, prompt)}
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
        </>
    );
};

export const handleChange = (prompt: string, setPrompt: React.Dispatch<React.SetStateAction<string>>) => {
    setPrompt(prompt)
};


export const handleSubmit = (event:any, prompt: string | Data) => {
    event.preventDefault();
    
    console.log("clicked submit")

    const body = {prompt: prompt}

    const response = fetch(
        "http://localhost:9991/diffusers", 
        {
            method: "POST",  
            mode: /* "cors", */"no-cors",
            //credentials: "omit",
            headers: {
                "Content-Type": "application/json"
            },
            //redirect: "follow",
            //referrerPolicy: "no-referrer",
            body: JSON.stringify(body) 
        }
    )
        .then(response => {
            console.log("the response from the server: ", response)
        })
};