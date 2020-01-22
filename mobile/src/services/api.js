import axios from 'axios'

const api = axios.create({
  baseURL: 'exp://192.168.43.158:3333'
})
export default api
