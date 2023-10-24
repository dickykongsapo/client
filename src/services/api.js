import Axios from "axios-observable";
import axios from "axios";
export const api = axios.create({
    baseURL: 'http://localhost:4000'
})

export const axiosForJava = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// export const api = Axios.create({
//     baseURL: 'http://localhost:8080'
// })