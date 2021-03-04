<template>
  <i v-if="state.loaded == false" class="fas fa-spinner fa-spin"></i>
  <div class="container-fluid" v-if="state.loaded">
    <div class="masonry mt-3">
      <keeps-component v-for="keep in state.keeps" :key="keep.id" :keep="keep" />
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
      keeps: computed(() => AppState.currentKeeps),
      loaded: false
    })
    onMounted(async() => {
      try {
        await keepsService.getKeeps()
      } catch (error) {
        console.error(error)
      } finally {
        state.loaded = true
      }
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
.fa-spinner {
  width: fit-content;
  height: fit-content;
  font-size: 2em;
  text-align: center;
  margin-top: 20vh;
  margin-left: 47vw;
}

</style>
