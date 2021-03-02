<template>
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
    Launch
  </button> -->

  <!-- Modal -->
  <div class="modal fade"
       :id="'keep' + keep.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog d-flex justify-content-center" role="document">
      <div class="modal-content">
        <div class="modal-body d-flex justify-content-around">
          <div class="container-fluid">
            <div class="row">
              <div class="col-6">
                <div id="image" :style="`background: url('${keep.img}');`">
                </div>
              </div>
              <div class="col-6">
                <i class="fas fa-backspace" v-if="state.account.id == keep.creatorId" @click="deleteKeep()"></i>
                <div class="d-flex justify-content-center border-bottom">
                  <h4>{{ keep.name }}</h4>
                  <div class="d-flex justify-content-around" id="modal-stats">
                    <i class="fas fa-eye h4 mb-0"></i>
                    <h4 class="mb-0">
                      {{ keep.views }}
                    </h4>
                  </div>
                  <div class="d-flex justify-content-around" id="modal-stats">
                    <i class="fab fa-kickstarter h4 mb-0"></i>
                    <h4 class="mb-0">
                      {{ keep.keeps }}
                    </h4>
                  </div>
                </div>
                <div class="border-bottom d-flex justify-content-center" type="button" data-dismiss="modal">
                  <router-link :to="{name: 'Profile', params: {id: keep.creator.id}}">
                    <h6 class="my-3">
                      created by: {{ keep.creator.name }}
                    </h6>
                  </router-link>
                </div>
                <div class="mt-5">
                  <h5>{{ keep.description }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div v-if="state.addKeep == true">
            <div v-for="vault in state.vaults" :key="vault.id">
              <button class="btn btn-primary" @click="addKeepToVault(vault.id)">
                {{ vault.name }}
              </button>
            </div>
          </div>
          <button class="btn btn-primary" v-if="state.addKeep == false && state.user.isAuthenticated" @click="getVaults">
            Add to vault
          </button>
          <button type="button" class="btn btn-primary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { keepsService } from '../services/KeepsService'
import { profilesService } from '../services/ProfilesService'
import { accountService } from '../services/AccountService'
import { vaultKeepsService } from '../services/VaultKeepsService'
// import { keepsService } from '../services/KeepsService'
export default {
  props: ['keep', 'page'],
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      addKeep: false,
      vaults: computed(() => AppState.currentVaults),
      user: computed(() => AppState.user)
    })
    return {
      state,
      test() {
        console.log(props.keep)
      },
      deleteKeep() {
        confirm('are you sure you want to delete')
        keepsService.delete(props.keep.id)
        // eslint-disable-next-line no-constant-condition
        if (props.page === 'account' || 'profile') {
          profilesService.getKeepsByProfile(state.account.id)
        } else if (props.page === 'home') {
          keepsService.getKeeps()
        }
      },
      getVaults() {
        accountService.getVaultsByAccount()
        state.addKeep = true
      },
      addKeepToVault(id) {
        const vk = {}
        vk.keepId = props.keep.id
        vk.vaultId = id
        vaultKeepsService.createVaultKeep(vk)
        state.addKeep = false
      }
    }
  }
}
</script>
<style scoped>
#modal-stats{
  width: 10vw;
}
#image {
  height: 40vw;
  width: auto;
  background-size:contain !important;
  background-repeat: no-repeat !important;
  border-radius: 5px 5px;
}
.modal-dialog {
  max-width: 80vw;
  margin: none;
}
.fa-backspace {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
