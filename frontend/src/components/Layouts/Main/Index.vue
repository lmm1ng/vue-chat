<template>
  <section class="main-layout">
    <el-container class="main-layout__container">
      <el-header>LOL</el-header>
      <el-container>
        <el-aside>LOL</el-aside>
        <el-main>
          <slot/>
        </el-main>
      </el-container>
    </el-container>
  </section>
</template>

<style lang="scss">
.main-layout {
  height: 100%;
  &__container {
    height: 100%;
  }
}
</style>