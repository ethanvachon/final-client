<template>
  <div class="container-fluid">
    <div class="row border-bottom mt-3" v-if="state.profile">
      <div class="col-12">
        <img :src="state.profile.picture" alt="">
        <h1>{{ state.profile.name }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h2>Keeps</h2>
      </div>
      <div class="col-3" v-for="keep in state.keeps" :key="keep.id">
        <keeps-component :keep="keep" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      profile: computed(() => AppState.currentProfile),
      keeps: computed(() => AppState.currentKeeps)
    })
    onMounted(() => {
      profilesService.getProfile(route.params.id)
      profilesService.getKeepsByProfile(route.params.id)
    })
    return {
      state,
      route
    }
  }
}
</script>
<style scoped>

</style>
