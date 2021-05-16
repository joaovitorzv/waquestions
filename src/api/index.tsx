import Axios from 'axios'

const api = Axios.create({
  baseURL: 'https://opentdb.com/api.php'
})

export default api