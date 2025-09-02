import axios from 'axios'
const baseUrl = import.meta.env.API_URL

const create = (newImage) => {
    const request = axios.post(`${baseUrl}/api/upload`, newImage)
    return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/api/download/${id}`)
    return request.then(response => response.data)
}

export default { getById, create }