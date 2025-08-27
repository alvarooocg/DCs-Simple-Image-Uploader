import React, {useCallback, useRef, useState} from "react"
import {useDropzone} from 'react-dropzone'
import InputImage from '../assets/exit.svg'

import Loading from "./Uploading"
import Uploaded from "./Uploaded"

const Main = ({ light }) => {
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [file, setFile] = useState(null)

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        if (fileRejections.lenght > 0) {
            alert("Archivo no válido. Solo se admiten formatos JPG, PNG, GIF y máximo 2MB.")
            return
        }

        setFile(acceptedFiles[0])

        console.log(file)
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setLoaded(true)
        }, 3000)
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': []
        },
        maxFiles: 1,
        maxSize: 2 * 1024 * 1024
    })

    const backgroundColor = light ? '#F9FAFB' : '#121826'
    const inputBackgroundColor = light ? '#FFFFFF' : '#212936'
    const textColor = light ? '#121826' : '#FFFFFF'
    const borderColor = light ? '#E5E7EB' : '#4D5562'

    const handleBrowseClick = (e) => {
        console.log('CLICKED')

        e.stopPropagation()
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    if (loaded === true) {
        return (
            <div className="main"
            style={{
                backgroundColor: backgroundColor
            }}>
                <Uploaded light={light} uploadedImage={file} />
            </div>
        )
    }

    else {
        return (
        <div className="main"
            style={{
                backgroundColor: backgroundColor
            }}>
        {loading ? <Loading light={light} /> 
            :
            <div className="main-container"
                style={{
                    backgroundColor: inputBackgroundColor
                }}
            >
                <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps({ ref: inputRef })} />
                    <img src={InputImage} className="input-img" alt="Upload" />
                    {
                        isDragActive ?
                            <p className="input-info"
                                style={{
                                    color: textColor
                                }}
                            >Drop the files here ...</p> : 
                            <p className="input-info"
                                style={{
                                    color: textColor
                                }}
                            >Drag & drop a file or <span className="input-link"
                                                        onClick={handleBrowseClick}
                                                    >browse files</span></p>
                    }
                    <p className="subtitle"
                        style={{
                                    color: textColor
                                }}
                    >JPG, PNG or GIF - Max file size 2MB</p>
                </div>
            </div>
        }            
        </div>
        )    
    }     
}

export default Main