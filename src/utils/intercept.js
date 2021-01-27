// import axios from 'axios'
// import router from '../router'
//
// axios.defaults.withCredentials = true
// export const request = (config) => {
//     return axios(config)
// }
// // 请求前设置header
// axios.interceptors.request.use(
//     config => {
//         debugger
//         if (localStorage.getItem('eleToken')) {
//             config.headers.Authorization = localStorage.getItem('eleToken')
//         }
//         debugger
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     })
//
// // 请求完成后 拦截器
// axios.interceptors.response.use(
//     response => {
//         debugger
//         if (response.data.success === false) {
//             router.replace({
//                 path: '/login'
//             })
//             localStorage.removeItem('eleToken')
//         }
//         return response
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     localStorage.removeItem('eleToken')
//                     router.replace({
//                         path: '/login',
//                         query: {redirect: router.currentRoute.fullPath} // 登录成功后 跳转当前页面
//                     })
//             }
//         }
//     }
// )
// // 这句一定要写
// export default axios
