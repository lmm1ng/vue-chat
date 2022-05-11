<template>
  <section class="main-layout">
    <el-container class="main-layout__container">
      <el-header>
        <el-button @click="isDrawer = true"></el-button>
      </el-header>
      <el-divider style="margin: 0"/>
      <el-container>
        <el-aside v-if="!isMobile">
          <chat-list/>
        </el-aside>
        <el-divider v-if="!isMobile" style="height: 100%;" direction="vertical"/>
        <el-main style="padding: 0 10px;">
          <chat/>
        </el-main>
      </el-container>
      <el-drawer v-model="isDrawer" :size="'90%'" direction="ltr" title="Chats">
        <chat-list/>
      </el-drawer>
    </el-container>
  </section>
</template>

<script setup>
import ChatList from '@/components/ChatList/Index'
import Chat from '@/components/Chat/Index'
import {ref, onMounted, onUnmounted, computed} from 'vue'

let windowWidth = ref(window.innerWidth)
const onWidthChange = () => windowWidth.value = window.innerWidth
onMounted(() => window.addEventListener('resize', onWidthChange))
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

const isDrawer = ref(false)
const isMobile = computed(() => windowWidth.value < 700)
</script>

<style lang="scss">
.main-layout {
  height: 100%;
  &__container {
    height: 100%;
    .el-drawer__body {
      padding: 0;
    }
  }
}

@media all and (min-width: 700px) {

}
</style>