<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <i class="fas fa-backspace" v-if="state.account.id == state.vault.creatorId" @click="deleteVault()"></i>
        <h1>{{ state.vault.name }}</h1>
        <h3>{{ state.vault.description }}</h3>
      </div>
    </div>
    <div class="row" v-if="state.keeps">
      <keeps-component :keep="keep" v-for="keep in state.keeps" :key="keep.id" />
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { vaultsService } from '../services/VaultsService'

export default {
  name: 'Vault',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      vault: computed(() => AppState.selectedVault),
      keeps: computed(() => AppState.currentKeeps)
    })
    onMounted(() => {
      vaultsService.getOne(route.params.id)
      vaultsService.getKeepsByVault(route.params.id)
    })
    return {
      state,
      deleteVault() {
        confirm('are you sure you want to delete')
        vaultsService.delete(state.vault.id)
        router.push({ path: '/' })
      }
    }
  }
}
</script>
<style scoped>

</style>
