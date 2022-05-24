<template>
  <div class="chat__header">
    <span>{{ chat.name }}</span>
    <div v-if="chat.type === 'dialog'">
      <div v-if="!companion.hasKey && chat.admin === user.id">
        <el-button
            v-if="chat.admin === user.id"
            :disabled="!isCompanionOnline"
            @click="startKeyExchange(companion.id)"
        >
          Exchange the key
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, inject} from 'vue'
import {useStore} from 'vuex'
import {createDiffie, createDiffieByPub} from '@/utils/crypto'

const socket = inject('socket')

const store = useStore()

const chat = computed(() => store.getters["chat/getActiveChat"])
const user = computed(() => store.getters["auth/getUser"])

const diffies = []

const companion = computed(() => {
  if (chat.value.type === 'dialog') {
    return chat.value.members.filter(el => el.id !== user.value.id)[0]
  } else {
    return null
  }
})

const isCompanionOnline = computed(() => store.getters['chat/isUserOnline'](chat.value.id, companion.value.id))

const startKeyExchange = userId => {
  console.log('1')
  const diffie = createDiffie()
  diffies.push({
    userId,
    diffie
  })
  socket.emit('start diffie exchange', {
    chatId: chat.value.id,
    from: user.value.id,
    to: userId,
    prime: diffie.getPrime(),
    generator: diffie.getGenerator(),
    pub: diffie.generateKeys()
  })
  console.log(diffie.generateKeys())
  console.log('1 end')
}

socket.on('request to exchange diffie', data => {
  console.log(data.pub.Uint8Array)
  const diffie = createDiffieByPub(data.prime, data.generator)
  diffies.push({
    userId: data.userId,
    diffie
  })
  const secret = diffie.computeSecret(data.pub.Uint8Array)
  console.log(secret)
  socket.emit('send diffie public to admin', {
    chatId: chat.value.id,
    from: user.value.id,
    to: data.from,
    pub: diffie.generateKeys('hex')
  })
  console.log('2 end')
})
socket.on('send diffie public to admin', data => {
  console.log('3')
  const diffie = diffies.find(el => el.userId === data.from)
  const secret = diffie.computeSecret(data.pub, 'hex', 'hex')
  console.log(secret)
  console.log('3 end')
})

</script>
<style lang="scss">
.chat__header {
  background-color: #DCDFE6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>