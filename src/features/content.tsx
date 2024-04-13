import { useState } from 'react'
import Panels from './panels'
import './content.css'

function Content(props: any) {
    const [gotInference, setGotInference] = useState(false)    

    return (
        <div className="content">
            <Panels biggerFirst={gotInference} 
                key={gotInference}
            />

            <button onClick={() => setGotInference(!gotInference)}>
                click
            </button>
        </div>
    )
}

export default Content
