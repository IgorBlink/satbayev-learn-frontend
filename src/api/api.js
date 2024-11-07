export const BASE_URL = "https://dl-back.km-dev.tech" //https://dl-back.km-dev.tech
const token = window.btoa(window.Telegram.WebApp.initData)
// const token = "cXVlcnlfaWQ9QUFGRUR6Uk5BQUFBQUVRUE5FMG50bzRIJnVzZXI9JTdCJTIyaWQlMjIlM0ExMjk1MjU3NDEyJTJDJTIyZmlyc3RfbmFtZSUyMiUzQSUyMkRhbmlpbCUyMiUyQyUyMmxhc3RfbmFtZSUyMiUzQSUyMiUyMiUyQyUyMnVzZXJuYW1lJTIyJTNBJTIyZDlBMm5ZM0ElMjIlMkMlMjJsYW5ndWFnZV9jb2RlJTIyJTNBJTIyZW4lMjIlMkMlMjJpc19wcmVtaXVtJTIyJTNBdHJ1ZSUyQyUyMmFsbG93c193cml0ZV90b19wbSUyMiUzQXRydWUlN0QmYXV0aF9kYXRlPTE3MjkwMDQxODgmaGFzaD1iYWQ4MGY2ZWRjMjQyOGFmYTg1YjUwOTlhNDAyMGNkMjI0YjRlOWQ4N2FiOTYzMmVmNGYxMGExNGRmNzRiNDNj"

export const fetchData = async (url, method, body = {}) => {
    if(method === "GET") {
        const response = await fetch(BASE_URL+url, {
            headers: {
                "ngrok-skip-browser-warning": "1",
                Authorization: token
            }
        }).then(res => res.json())
        return response
        
    } else {
        const response = await fetch(BASE_URL+url , {
            method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "1",
                Authorization: token
            }
        }).then(res => res.json())

        return response
    }
}