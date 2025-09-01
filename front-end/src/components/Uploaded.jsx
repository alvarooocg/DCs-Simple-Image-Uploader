import { useEffect, useState } from 'react'
import ShareLogo from '../assets/Link.svg'
import DownloadLogo from '../assets/download.svg'

const Uploaded = ({ light, uploadedImage, copyUrl }) => {
    const [imageUrl, setImageUrl] = useState(null)

    const inputBackgroundColor = light ? '#FFFFFF' : '#212936'

    useEffect(() => {
        if (uploadedImage) {
            const url = URL.createObjectURL(uploadedImage)
            setImageUrl(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [uploadedImage])

    return (
        <div className="uploaded-container">
            <div className="image-container"
                style={{
                    backgroundColor: inputBackgroundColor
                }}>
                {imageUrl && <img className='image-uploaded' src={imageUrl} alt="Uploaded image" />}
            </div>
            <div className="btns-container">
                <button className="share-btn" onClick={ copyUrl() }>
                    <img src={ShareLogo} className='btn-image' alt="Share button" />
                    <p className='btn-text'>Share</p>
                </button>
                <button className="download-btn">
                    <img src={DownloadLogo} className='btn-image' alt="Download button" />
                    <p className='btn-text'>Download</p>
                </button>
            </div>
        </div>
    )
}

export default Uploaded