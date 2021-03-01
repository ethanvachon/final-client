import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/api/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getVaultsByAccount() {
    const res = await api.get('api/account/vaults')
    AppState.currentVaults = res.data
  }
}

export const accountService = new AccountService()
