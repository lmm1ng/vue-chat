<template>
  <div class="chat__header">
    <span>{{ chat.name }}</span>
    <div v-if="chat.type === 'dialog'">
      <div v-if="!companion.hasKey && chat.admin === user.id">
        <el-button :disabled="!isCompanionOnline">Exchange the key</el-button>
        {{store.state["chat/onlineUsers"]}}
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const chat = computed(() => store.getters["chat/getActiveChat"])
const user = computed(() => store.getters["auth/getUser"])

const companion = computed(() => {
  if (chat.value.type === 'dialog') {
    return chat.value.members.filter(el => el.id !== user.value.id)[0]
  } else {
    return null
  }
})

const isCompanionOnline = computed(() => store.getters['chat/isUserOnline'](chat.value.id, companion.value.id))

</script>
<style lang="scss">
.chat__header {
  background-color: #DCDFE6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>