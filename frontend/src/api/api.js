import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
});

api.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        const originalRequest = error.config;
        if(error.response?.status === 401 && 
            !originalRequest._retry &&
            !originalRequest.url.includes("/users/login") &&
            !originalRequest.url.includes("/users/refresh-token")){
            originalRequest._retry = true;
            try {
                console.log("Access Token Expired");
                await api.post("/users/refresh-token")
                return api(originalRequest) 
            } catch (refreshError) {
                return Promise.reject(refreshError)   
            }  
        }
        return Promise.reject(error);
    }
)

export default api;