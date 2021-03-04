<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <i class="fas fa-trash" v-if="state.account.id == state.vault.creatorId" @click="deleteVault()"></i>
        <div class="card mt-3 ml-1" v-if="state.vault.name">
          <div class="card-body">
            <h1 class="card-title">
              {{ state.vault.name }}
            </h1>
            <h3 class="card-title">
              {{ state.vault.description }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <h1 class="error-message" v-if="state.keeps.length == 0 && state.vault.name">
      This Vault Has No Keeps
    </h1>
    <h1 class="error-message" v-if="!state.vault.name">
      This vault is private
    </h1>
    <div class="masonry" v-if="state.keeps">
      <keeps-component :keep="keep" :vault="state.vault" :page="'vault'" v-for="keep in state.keeps" :key="keep.id" />
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { vaultsService } from '../services/VaultsService'
import Swal from 'sweetalert2'

export default {
  name: 'Vault',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      vault: computed(() => AppState.selectedVault),
      keeps: computed(() => AppState.currentKeeps),
      user: computed(() => AppState.user)
    })
    onMounted(() => {
      vaultsService.getOne(route.params.id)
      vaultsService.getKeepsByVault(route.params.id)
    })
    return {
      state,
      deleteVault() {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#2a93ad',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            vaultsService.delete(state.vault.id)
            router.push({ path: '/' })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.masonry {
  column-count: 3;
  column-gap: 2em;
}
.fa-trash {
  position: absolute;
  top: 3vh;
  right: 3vw;
  font-size: 1.5em;
}
.error-message {
  text-align: center;
  margin-top: 20vh;
}
</style>
