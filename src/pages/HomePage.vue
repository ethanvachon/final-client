<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>Keeps</h1>
      </div>
    </div>
    <div class="row masonry">
      <keeps-component v-for="keep in state.keeps" :key="keep.id" :keep="keep" :page="'home'" />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { computed, reactive, onMounted } from 'vue'
import { keepsService } from '../services/KeepsService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      keeps: computed(() => AppState.currentKeeps)
    })
    onMounted(() => {
      keepsService.getKeeps()
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
