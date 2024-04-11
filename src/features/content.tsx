import { useEffect, useState } from 'react'
import './content.css'
import Panel from './panel'

function Content(props: any) {
    const [gotInference, setGotInference] = useState(false)    
    useEffect(() => {
        
    },
        [gotInference]
    );

    return (
        <div className="content">
            {
                !gotInference? 
                    <div className="panels">
                        <Panel width="25vw" height="60vh">
                            <div> + </div>
                        </Panel>
                        <Panel width="10vw" height="45vh"/>   
                        <Panel width="3vw" height="35vh"/>               
                    </div>

                :
                    <>
                        <Panel width="5%" height="15%"/>                        
                        <Panel width="10%" height="20%"/>                     
                        <Panel width="30%" height="30%">
                            <div> + </div>
                        </Panel>
                    </>
            }

            <button onClick={() => setGotInference(!gotInference)}>
                click
            </button>
        </div>
    )
}

export default Content
