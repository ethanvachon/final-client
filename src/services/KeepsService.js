import { AppState } from '../AppState'
import { api } from './AxiosService'
import { profilesService } from '../services/ProfilesService'

class KeepsService {
  async getKeeps() {
    const res = await api.get('api/keeps')
    AppState.currentKeeps = res.data
  }

  async addView(id) {
    await api.put('api/keeps/' + id + '/addview')
  }

  // async getOne(id) {
  //   const res = await api.get('api/keeps' + id)
  // }
  async create(newKeep) {
    await api.post('api/keeps', newKeep)
    const id = AppState.account.id
    profilesService.getKeepsByProfile(id)
  }

  async edit(id, editKeep) {
    const res = await api.Edit('api/keeps' + id, editKeep)
    console.log(res.data)
  }

  async delete(id) {
    const res = await api.delete('api/keeps/' + id)
    console.log(res.data)
  }
}

export const keepsService = new KeepsService()
