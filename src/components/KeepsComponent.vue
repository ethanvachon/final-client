<template>
  <div class="item">
    <!-- <div class="col-4"> -->
    <!-- <div class="my-2">
      <div class="card"
           @click="state.addView()"
           type="button"
           data-toggle="modal"
           data-target="#modelId"
           :style="`background: linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)), url('${keep.img}');`"
      >
        <div class="card-body d-flex align-items-end justify-content-between">
          <h3 class="card-text text-white">
            {{ keep.name }}
          </h3>
          <img :src="keep.creator.picture" alt="">
        </div>
      </div>
    </div> -->
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
      <h3 class="text-white mr-5 mb-0">
        {{ keep.name }}
      </h3>
    </div>
    <img :src="keep.creator.picture" id="profile-img" class="ml-3">
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
    top: 80px;
    right: 20px;
  }
  .img-fluid {
    border-radius: 5px;
  }
  .keep-text {
    position: absolute;
    z-index: 15;
    top: 3vh;
    left: 2vw;
  }
  #profile-img {
    height: 5vh;
    width: auto;
    border-radius: 100%;
    position: absolute;
    top: 3vh;
    right: 2vw;
  }
  .item {
  display: inline-block;
  margin: 0 0 1em;
  width: 100%;
}
</style>
