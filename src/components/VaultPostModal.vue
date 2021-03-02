<template>
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#vaultPost">
    Launch
  </button> -->

  <!-- Modal -->
  <div class="modal fade"
       id="vaultPost"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Vault
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createVault()">
            <input type="text" v-model="state.newVault.name" placeholder="name">
            <input type="text" v-model="state.newVault.description" placeholder="description">
            <input type="checkbox" name="private" v-model="state.newVault.isPrivate">
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { vaultsService } from '../services/VaultsService'
export default {
  setup() {
    const state = reactive({
      newVault: {}
    })
    return {
      state,
      createVault() {
        vaultsService.create(state.newVault)
      }
    }
  }
}
</script>
<style scoped>

</style>
