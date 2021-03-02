<template>
  <div class="item">
    <div class="row">
      <div class="col-12">
        <img @click="state.addView()"
             type="button"
             data-toggle="modal"
             :data-target="'#keep' + keep.id"
             :src="keep.img"
             alt=""
             class="img-fluid my-3"
        >
        <div v-if="page == 'vault'">
          <p id="remove" v-if="vault.creatorId == state.account.id" class="text-white" @click="removeFromVault()">
            remove
          </p>
        </div>
        <div class="keep-text d-flex">
          <h3 class="text-white mb-0">
            {{ keep.name }}
          </h3>
        </div>
        <img :src="keep.creator.picture" id="profile-img">
      </div>
    </div>
  </div>
  <!-- </div> -->
  <keep-modal :keep="props.keep" :page="props.page" />
</template>
<script>
import { reactive, computed } from 'vue'
import { keepsService } from '../services/KeepsService'
import { AppState } from '../AppState'
import { vaultKeepsService } from '../services/VaultKeepsService'
export default {
  props: ['keep', 'page', 'vault'],
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account),
      addView() {
        keepsService.addView(props.keep.id)
      }
    })
    return {
      state,
      props,
      removeFromVault() {
        vaultKeepsService.removeVaultKeep(props.keep.vaultKeepId, props.vault.id)
      }
    }
  }
}
</script>
<style scoped>
  /* .card {
    width:100%;
    height: 300px;
    border-radius: 5px;
    background-size:cover !important;
  } */
  #remove {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .img-fluid {
    border-radius: 5px;
  }
  .keep-text {
    z-index: 15;
    position: absolute;
    bottom: 3vh;
    left: 2.5vw;
  }
  #profile-img {
    height: 5vh;
    width: auto;
    border-radius: 100%;
    position: absolute;
    top: 3vh;
    left: 2.5vw;
  }
  .item {
  display: inline-block;
  margin: 0 0 1em;
  width: 100%;
}
</style>
