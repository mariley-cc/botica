import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {

    post (payload = {}) {
        const data = payload.data || {}
    
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/purchases`,
            method: 'post',
            data
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
    get (payload = {}) {
        const params = payload.params || {}
    
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/purchases`,
            method: 'get',
            params
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
    getById (payload = {}) {
        const purchaseId = payload.purchaseId
    
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/purchases/${purchaseId}`,
            method: 'get'
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },
      put (payload = {}) {
        const purchaseId = payload.purchaseId
        const data = payload.data || {}
    
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/purchases/${purchaseId}`,
            method: 'put',
            data
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },

      delete (payload = {}) {
        const Id = payload.Id
    
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/purchases/${Id}`,
            method: 'delete'
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      }
}
