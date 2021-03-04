/* eslint-disable vue/one-component-per-file */
<template>
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#keepPost">
    Launch
  </button> -->

  <!-- Modal -->
  <div class="modal fade"
       id="keepPost"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create Keep
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createVault()">
            <input type="text" maxlength="14" v-model="state.newKeep.name" placeholder="name">
            <input type="text" v-model="state.newKeep.description" placeholder="description">
            <input type="text" v-model="state.newKeep.img" placeholder="image url">
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
import { keepsService } from '../services/KeepsService'
import Swal from 'sweetalert2'
export default {
  setup() {
    const state = reactive({
      newKeep: {}
    })
    return {
      state,
      createVault() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Keep Created'
        })
        keepsService.create(state.newKeep)
        state.newKeep = {}
      }
    }
  }
}
</script>
<style scoped>

</style>
