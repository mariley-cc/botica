import axios from 'axios'
import { baseUrlAPI } from '@/config/api'
const HOST = baseUrlAPI

export default {
  get (payload = {}) {
    const params = payload.params || {}

    return new Promise((resolve, reject) => {
      axios({
        url: `${HOST}/dashboard`,
        method: 'get',
        params
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
