<template>
  <component v-if="layout" :is="layout" :key="layout">
    <router-view/>
  </component>
  <router-view v-else/>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'

import MainLayout from '@/components/Layouts/Main/Index'
import LoginLayout from '@/components/Layouts/Login/Index'

export default {
  components: {
    LoginLayout,
    MainLayout
  },
  setup () {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)

    return { layout }
  }
}

</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
