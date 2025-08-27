const Loading = ({ light }) => {

    const inputBackgroundColor = light ? '#FFFFFF' : '#212936'
    const textColor = light ? '#121826' : '#FFFFFF'
    const borderColor = light ? '#E5E7EB' : '#4D5562'

    return (
        <div className="loading-container"
            style={{
                backgroundColor: inputBackgroundColor
            }}
        >
            <p className="loading-text"
                style={{
                    color: textColor
                }}
            ><b>Uploading</b>, please wait...</p>
            <div className="loading-bar"
                style={{
                    backgroundColor: borderColor
                }}
            >
                <div className="loading-bar-progress"></div>
            </div>
        </div>
    )
}

export default Loading