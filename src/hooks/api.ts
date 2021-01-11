import handleRequest from './request'
interface Api {
  [key: string]: (data?) => any;
}

const api: Api = {}

api.postStudent = data => {
  return handleRequest('/api/v1/student', data)({ method: 'POST' })
}

export default api
