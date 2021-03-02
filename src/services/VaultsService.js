import { AppState } from '../AppState'
import { api } from './AxiosService'
import { accountService } from '../services/AccountService'
class VaultsService {
  async getOne(id) {
    const res = await api.get('api/vaults/' + id)
    AppState.selectedVault = res.data
  }

  async getKeepsByVault(id) {
    const res = await api.get('api/vaults/' + id + '/keeps')
    AppState.currentKeeps = res.data
  }

  async create(newVault) {
    await api.post('api/vaults', newVault)
    accountService.getVaultsByAccount()
  }

  async edit(editVault, id) {
    const res = await api.put('api/vaults' + id, editVault)
    console.log(res.data)
  }

  async delete(id) {
    const res = await api.delete('api/vaults' + id)
    console.log(res)
  }
}

export const vaultsService = new VaultsService()
