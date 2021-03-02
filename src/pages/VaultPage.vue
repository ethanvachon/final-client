<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
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
import { useRoute } from 'vue-router'
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { vaultsService } from '../services/VaultsService'
export default {
  name: 'Vault',
  setup() {
    const route = useRoute()
    const state = reactive({
      vault: computed(() => AppState.selectedVault),
      keeps: computed(() => AppState.currentKeeps)
    })
    onMounted(() => {
      vaultsService.getOne(route.params.id)
      vaultsService.getKeepsByVault(route.params.id)
    })
    return {
      state
    }
  }
}
</script>
<style scoped>

</style>
