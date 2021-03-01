// import { AppState } from '../AppState'
import { api } from './AxiosService'

class VaultKeepsService {
  async createVaultKeep(newVk) {
    await api.post('api/vaultkeeps', newVk)
  }

  async removeVaultKeep(id) {
    await api.delete('api/vaultkeeps' + id)
  }
}

export const vaultKeepsService = new VaultKeepsService()
