<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
import config from '~/nuxt.config'
import Header from '~/components/Header.vue'

export default {
  middleware: 'authenticated',
  components: {
    Header
  },
  mounted() {
    console.log(config.message)
    console.log(config.profile)
  }
}
</script>

<style>
  body {
    background-color: #F4F5F7;
  }
</style>
