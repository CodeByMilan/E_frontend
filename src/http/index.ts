import axios from "axios";

const API=axios.create ({
    baseURL: "http://localhost:3000",
    headers:{
        //front-end to backend
        "Content-Type": "application/json",
        //backend to frontend
        'Accept':'application/json'
    }
})
const APIAuthenticated=axios.create({
    baseURL: "http://localhost:3000",
    headers:{
        //front-end to backend
        "Content-Type": "application/json",
        //backend to frontend
        'Accept':'application/json',
        "Authorization": localStorage.getItem('token') || '',
    }
})

export {
    API,
    APIAuthenticated
}  