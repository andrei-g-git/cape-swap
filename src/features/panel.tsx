import './panel.css';

function Panel(props: any) {
    return (
        <div className="panel"
            style={{width: props.width, height: props.height}}
        >
            {
                props.children
            }
        </div>
    )
}

export default Panel
