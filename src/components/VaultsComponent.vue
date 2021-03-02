<template>
  <div class="card">
    <router-link :to="{name: 'Vault', params: {id: vault.id}}">
      <div class="card-body">
        <h4 class="card-title">
          {{ vault.name }}
        </h4>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ['vault']
}
</script>
<style scoped>

</style>
