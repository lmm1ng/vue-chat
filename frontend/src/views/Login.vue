<template>
  <section class="login-wrapper">
    <el-card class="login-form">
      <template #header>
        <h2 style="margin: 0">Login</h2>
      </template>
      <el-form ref="form" :model="loginForm" label-width="120px">
        <el-form-item :rules="[required, email]" prop="email" label="E-mail">
          <el-input v-model="loginForm.email" type="email"/>
        </el-form-item>
        <el-form-item :rules="[required, password]" label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password"/>
        </el-form-item>
        <el-form-item class="registration-form__buttons">
          <el-link @click="toRegistration">Not registered yet?</el-link>
          <el-button type="primary" @click="onSubmit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script setup>
import {ref, toRaw} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {email, required, password} from '@/constants/rules'

const store = useStore()
const router = useRouter()

const form = ref(null)

const loginForm = ref({
  email: '',
  password: '',
})

const onSubmit = () => {
  form.value.validate(valid => {
    if (valid) {
      console.log(toRaw(loginForm.value))
      store.dispatch('auth/fetchLogin', {...toRaw(loginForm.value), deviceId: localStorage.getItem('deviceId')})
          .then(() => router.push('/'))
    }
  })
}

const toRegistration = () => {
  router.push({name: 'Registration'})
}
</script>

<style lang="scss">
.login-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  @media all and (min-width: 1024px) {
    width: 500px;
  }

  &__buttons {
    .el-form-item__content {
      display: flex;
      width: 100%;
      justify-content: space-around;
    }
  }
}
</style>