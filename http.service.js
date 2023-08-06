import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://games-server-k73y.onrender.com/anime-ranking/'
    : 'https://games-server-k73y.onrender.com/anime-ranking/'
// : '//localhost:3030/anime-ranking/'


var axios = Axios.create({
    withCredentials: false
})

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'GET', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } 
    catch (err) {
        throw err
    }
}