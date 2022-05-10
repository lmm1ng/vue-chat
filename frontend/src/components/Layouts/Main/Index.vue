<template>
  <section class="main-layout">
    <el-container class="main-layout__container">
      <el-header>LOL</el-header>
      <el-divider style="margin: 0"/>
      <el-container>
        <el-aside>
          <chat-list/>
        </el-aside>
        <el-divider style="height: 100%;" direction="vertical"/>
        <el-main>
          <slot/>
        </el-main>
      </el-container>
    </el-container>
  </section>
</template>

<script setup>
import ChatList from '@/components/ChatList/Index'
</script>

<style lang="scss">
.main-layout {
  height: 100%;
  &__container {
    height: 100%;
  }
}
</style>