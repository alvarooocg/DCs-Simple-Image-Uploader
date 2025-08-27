import Logo from '../assets/logo-small.svg'
import LightMode from '../assets/Moon_fill.svg'
import DarkMode from '../assets/Sun_fill.svg'

const Top = ({ light, changeMode }) => {
    const ColorMode = light ? LightMode : DarkMode 
    const backgroundColor = light ? '#F9FAFB' : '#121826'
    const textColor = light ? '#121826' : '#FFFFFF'
    const inputBackgroundColor = light ? '#FFFFFF' : '#212936'
    const borderColor = light ? '#E5E7EB' : '#4D5562'

    return (
        <div className="top-container"
            style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor
            }}
        >
            <div className='logo-container'>    
                <img src={Logo} alt="Image uploader logo" className='logo-image' />
                <p className="logo-text"
                    style={{
                        color: textColor
                    }}
                >ImageUpload</p>
            </div>

            <label className='switch'
                style={{
                    backgroundColor: inputBackgroundColor,
                    borderColor: borderColor
                }}
            >
                <input type='checkbox' onClick={() => changeMode()}/>
                <img src={ColorMode} alt="Color mode (Light/Dark)" />
            </label>
        </div>
    )}

export default Top