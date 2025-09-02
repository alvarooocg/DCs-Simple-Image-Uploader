import React, {useCallback, useRef, useState, useEffect} from "react"
import {useDropzone} from 'react-dropzone'
import InputImage from '../assets/exit.svg'

import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom'

import imageServices from '../services/images'

import { v4 as uuidv4 } from 'uuid'

import Loading from "./Uploading"
import Uploaded from "./Uploaded"

const Container = ({ light }) => {
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [file, setFile] = useState(null)

    const { id } = useParams()
    const [newId, setNewId] = useState('')
  
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            imageServices.getById(id).then(image => {
                if (image.file) {
                    if (typeof image.file === 'string') {
                        setFile(`data:image/*;base64,${image.file}`)
                    } else {
                        const base64String = btoa(
                            String.fromCharCode(...new Uint8Array(image.file.data))
                        )
                        setFile(`data:image/*;base64,${base64String}`)
                    }
                }
            }).catch(error => {
                console.error('Error loading image: ', error)
            })
        } else {
            setFile(null)
        }
    }, [id])

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const base64 = reader.result.split(',')[1]
                resolve(base64)
            }
            reader.onerror = error => reject(error)
        })
    }
    
    const uploadImage = async (uploadedFile) => {
        try {
            const generatedId = uuidv4()
            setNewId(generatedId)

            const base64File = await fileToBase64(uploadedFile)

            const newImage = {
                id: generatedId,
                file: base64File,
                fileName: uploadedFile.name,
                fileType: uploadedFile.fileType
            }

            await imageServices.create(newImage)
            navigate(`/${generatedId}`)
        } catch (error) {
            console.error('Error sharing image: ', error)
        }
    }    

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
            alert("Archivo no válido. Solo se admiten formatos JPG, PNG, GIF y máximo 2MB.")
            return
        }
        
        const uploadedFile = acceptedFiles[0]
        console.log("ACCEPTED FILES => ", uploadedFile)

        setFile(uploadedFile)
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setLoaded(true)
            uploadImage(uploadedFile)
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
        e.stopPropagation()
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    if (loaded === true || id) {
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

export default Container