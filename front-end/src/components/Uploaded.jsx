import { useEffect, useState } from 'react'
import ShareLogo from '../assets/Link.svg'
import DownloadLogo from '../assets/download.svg'

const Uploaded = ({ light, uploadedImage }) => {
    const [imageUrl, setImageUrl] = useState(null)

    const inputBackgroundColor = light ? '#FFFFFF' : '#212936'

    useEffect(() => {
        if (uploadedImage) {
            if (typeof uploadedImage === 'string' && uploadedImage.startsWith('data:')) {
                setImageUrl(uploadedImage)
            }
            else if (uploadedImage instanceof File) {
                const url = URL.createObjectURL(uploadedImage)
                setImageUrl(url)
                return () => URL.revokeObjectURL(url)
            }
            else if (typeof uploadedImage === 'string') {
                setImageUrl(uploadedImage)
            }
        }
    }, [uploadedImage])

    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            console.log('URL copiada al portapapeles!')
            alert('¡URL copiada al portapapeles!')
        } catch (error) {
            console.error('Error al copiar URL:', error)
            copyUrlFallback()
    }
}

    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement('a')
            link.href = imageUrl
            link.download = 'downloaded-image.jpg'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    return (
        <div className="uploaded-container">
            <div className="image-container"
                style={{
                    backgroundColor: inputBackgroundColor
                }}>
                {imageUrl && <img className='image-uploaded' src={imageUrl} alt="Uploaded image" />}
            </div>
            <div className="btns-container">
                <button className="share-btn" onClick={copyUrl}>
                    <img src={ShareLogo} className='btn-image' alt="Share button" />
                    <p className='btn-text'>Share</p>
                </button>
                <button className="download-btn" onClick={handleDownload}>
                    <img src={DownloadLogo} className='btn-image' alt="Download button" />
                    <p className='btn-text'>Download</p>
                </button>
            </div>
        </div>
    )
}

export default Uploaded