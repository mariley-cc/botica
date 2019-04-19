import axios from 'axios'
import { baseUrlAPI } from '@/config/api'

const HOST = baseUrlAPI

export default {

    post (payload = {}) {
        const data = payload.data || {}
    
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/kairo-compositions`,
            method: 'post',
            data
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },

    get (payload = {}) {
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/kairo-compositions`,
            method: 'get'
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      },

    put (payload = {}) {
        const Id = payload.Id
        const data = payload.data || {}
    
        return new Promise((resolve, reject) => {
          axios({
            url: `${HOST}/kairo-compositions/${Id}`,
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
            url: `${HOST}/kairo-compositions/${Id}`,
            method: 'delete'
          })
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      }
}