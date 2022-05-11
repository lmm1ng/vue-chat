<template>
  <section class="chat" v-if="activeChatId">
    <div class="chat__header">Header</div>
    <div class="chat__content">
      <div class="chat__content messages">
        <message-comp
            v-for="message in currentChat.messages"
            :key="message.id"
            :text="message.text"
            :variant="currentChat.type"
            :time="message.createdAt"
            :from="message.from"
        />
      </div>
    </div>
    <div class="chat__inputs">
      <el-input v-model="message" type="textarea" placeholder="Start typing..." resize="none" rows="2"/>
      <el-button type="primary" :icon="Promotion" @click="sendMessage">Send</el-button>
    </div>
  </section>
  <div class="no-chat-banner" v-else>Select a chat</div>
</template>

<script setup>
import {computed, ref, inject} from 'vue'
import {useStore} from 'vuex'
import MessageComp from '@/components/Chat/Message'
import {Promotion} from '@element-plus/icons-vue'

const store = useStore()
const socket = inject('socket')

const activeChatId = computed(() => store.getters['chat/getActiveChat'])
const currentChat = computed(() => store.getters['chat/getUserChats'].find(chat => chat.id === activeChatId.value))
const currentUser = computed(() => store.getters['auth/getUser'])
const insertMessage = message => store.commit('chat/insertMessage', message)

const message = ref('')

const sendMessage = () => {
  const messageObj = {
    chat: activeChatId.value,
    text: message.value,
    from: currentUser.value.id,
    createdAt: new Date().toISOString()
  }
  socket.emit('send message', messageObj)
  insertMessage(messageObj)
}
socket.on('receive message', data => {
  insertMessage(data)
})
</script>

<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__header {
    height: 50px;
  }

  &__content {
    height: calc(100% - 50px - 52px);
    position: relative;
    bottom: 0;
    overflow: auto;
    display: flex;
    min-width: 380px;
    &.messages {
      height: 100%;
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column-reverse;
      gap: 20px;
      box-sizing: border-box;
      padding: 20px;
      flex-grow: 1;
    }
  }

  &__inputs {
    height: 52px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
}

.no-chat-banner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #DCDCDC;
}
</style>