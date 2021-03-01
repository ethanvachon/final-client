<template>
  <div class="col-4">
    <div class="my-2">
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
    </div>
  </div>
  <keep-modal :keep="props.keep">
  </keep-modal>
</template>
<script>
import { reactive } from 'vue'
import { keepsService } from '../services/KeepsService'
export default {
  props: ['keep'],
  setup(props) {
    const state = reactive({
      addView() {
        console.log(props.keep)
        keepsService.addView(props.keep.id)
      }
    })
    return {
      state,
      props
    }
  }
}
</script>
<style scoped>
  .card {
    width:100%;
    height: 300px;
    border-radius: 5px;
    background-size:cover !important;
  }
  img {
    height: 5vh;
    width: auto;
    border-radius: 100%;
  }
</style>
