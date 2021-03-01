<template>
  {{ keep }}
</template>
<script>
import { reactive } from 'vue'
export default {
  props: ['keep'],
  setup(props) {
    const state = reactive({
    })
    return { state }
  }
}
</script>
<style scoped>

</style>
