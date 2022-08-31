import axios from 'axios'

const options = {
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: 10000,
}
const request = axios.create(options)

request.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {

    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default request