<template>
  <div :class="['message', {'message--my': from === myId}]">
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed, defineProps} from 'vue'

defineProps({
  text: String,
  variant: String,
  time: String,
  from: String
})

const store = useStore()
const myId = computed(() => store.getters['auth/getUser']?.id)
</script>
<style lang="scss">
.message {
  min-width: 300px;
  max-width: 40%;
  word-break: break-all;
  padding: 10px;
  background-color: #DCDFE6;
  border-radius: 10px;
}
.message--my {
  align-self: end;
  text-align: end;
  background-color: #90c7ff;
}
</style>