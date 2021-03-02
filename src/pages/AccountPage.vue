<template>
  <div class="container-fluid">
    <div class="row border-bottom mt-3" v-if="state.account">
      <div class="col-12">
        <img :src="state.account.picture" alt="">
        <h1>{{ state.account.name }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2>Keeps</h2>
        <button class="btn btn-primary" data-toggle="modal" data-target="#keepPost">
          +
        </button>
        <keep-post-modal />
      </div>
      <div class="masonry">
        <keeps-component :keep="keep" :page="'account'" v-for="keep in state.keeps" :key="keep.id" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2>Vaults</h2>
        <button class="btn btn-primary" data-toggle="modal" data-target="#vaultPost">
          +
        </button>
        <vault-post-modal />
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="vault in state.vaults" :key="vault.id">
        <vaults-component :vault="vault" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      keeps: computed(() => AppState.currentKeeps),
      vaults: computed(() => AppState.currentVaults)
    })
    onMounted(async() => {
      await accountService.getAccount()
      profilesService.getKeepsByProfile(state.account.id)
      accountService.getVaultsByAccount()
    })
    return {
      state
    }
  }
}
</script>
<style scoped>
.masonry {
  column-count: 3;
  column-gap: 2em;
}
</style>
