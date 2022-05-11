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
  min-height: -webkit-fill-available;
  height: -webkit-fill-available;
  margin: 0;
  padding: 0;
}

/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
