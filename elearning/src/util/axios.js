import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://elearning0706.cybersoft.edu.vn/api/'

})
export const setAuthorization = token => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`
}
export default instance