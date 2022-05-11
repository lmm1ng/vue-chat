<template>
  <el-card :class="['chat-list-item', {'chat-list-item--is-active': isActive}]" shadow="never">
    <el-avatar class="chat-list-item__avatar" :size="30">
      <img :src="avatar"/>
    </el-avatar>
    <div class="chat-list-item__text">
      <span>{{ name }}</span>
      <span>{{ lastMessage }}</span>
    </div>
  </el-card>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  avatar: String,
  name: String,
  isActive: Boolean,
  lastMessage: String
})
</script>

<style lang="scss">
.chat-list-item {
  cursor: pointer;

  & .el-card__body {
    width: 100%;
    display: flex;
    padding: 5px;
    align-items: center;
  }

  &--is-active {
    & .el-card__body {
      background-color: #ECF5FF;
    }
  }
}

.chat-list-item--is-active {
}

.chat-list-item__text {
  display: flex;
  flex-direction: column;
}

.chat-list-item__avatar {
  margin-right: 20px;
}
</style>