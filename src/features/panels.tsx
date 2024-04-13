import { useEffect } from "react"
import Panel from "./panel"

function Panels(props: any) {

    return (
        <>
            {
                !props.biggerFirst? 
                    <div className="panels">
                        <Panel index={1} width="25vw" height="60vh">
                            <div> + </div>
                        </Panel>
                        <Panel index={2} width="10vw" height="45vh"/>   
                        <Panel index={3} width="3vw" height="35vh"/>               
                    </div>

                :
                    <div className="panels">
                        <Panel index={1} width="3vw" height="35vh"/>                        
                        <Panel index={2} width="10vw" height="45vh"/>                     
                        <Panel index={3} width="25vw" height="60vh">
                            <div> + </div>
                        </Panel>
                    </div>
            }        
        </>
    )
}

export default Panels
