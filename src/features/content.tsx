import { useState } from 'react'
import Panels from './panels'
import './content.css'

function Content(props: any) { //this looks a bit useless now...

    return (
        <div className="content">
            <Panels />
        </div>
    )
}



export default Content
