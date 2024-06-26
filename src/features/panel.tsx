import './panel.css';

function Panel(props: any) {
    return (
        <div className="panel"
            id={`panel-${props.index}`}
            style={{width: props.width, height: props.height}}
        >
            {
                props.children
            }
        </div>
    )
}

export default Panel
