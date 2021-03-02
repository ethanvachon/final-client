// import { AppState } from '../AppState'
import { api } from './AxiosService'
import { vaultsService } from './VaultsService'

class VaultKeepsService {
  async createVaultKeep(newVk) {
    await api.post('api/vaultkeeps', newVk)
  }

  async removeVaultKeep(id, vaultId) {
    await api.delete('api/vaultkeeps/' + id)
    vaultsService.getKeepsByVault(vaultId)
  }
}

export const vaultKeepsService = new VaultKeepsService()
