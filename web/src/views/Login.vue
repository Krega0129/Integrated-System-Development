<template>
  <v-container fluid class="primary full-height d-flex">
    <v-card 
      width="400"
      class="mx-auto align-self-center"
    >
      <v-toolbar class="text-center" flat>
        <v-btn
          text
          small
          class="absolute left"
          @click="prevStep"
          v-if="showBack"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <v-toolbar-title class="text-h5 font-weight-black mx-auto">{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <!-- <v-form v-model="valid">
          <v-text-field
            label="账号"
            ref="textField"
            placeholder="输入你的账号"
            v-model="loginForm.account"
            :rules="[formRules.required]"
          ></v-text-field>

          <v-text-field
            label="密码"
            ref="textField"
            placeholder="输入你的密码"
            :rules="[formRules.required]"
            v-model="loginForm.password"
            autocomplete="new-password"
            :append-icon="loginForm.eye1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="loginForm.eye1 ? 'text' : 'password'"
            @click:append="loginForm.eye1 = !loginForm.eye1"
          ></v-text-field>
        </v-form> -->

        <v-window v-model="registerStep">
          <!-- 登录 -->
          <v-window-item :value="1">
            <v-card-text>
              <v-form v-model="loginForm.valid" ref="loginForm">
                <v-text-field
                  label="账号"
                  placeholder="输入你的账号"
                  v-model="loginForm.account"
                  :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                  label="密码"
                  placeholder="输入你的密码"
                  :rules="[rules.required]"
                  v-model="loginForm.password"
                  autocomplete="new-password"
                  :append-icon="loginForm.eye ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="loginForm.eye ? 'text' : 'password'"
                  @click:append="loginForm.eye = !loginForm.eye"
                ></v-text-field>
              </v-form>
              <v-btn
                block
                color="primary"
                @click="login"
                class="mt-4"
                :disabled="!loginForm.valid"
              >
                登录
              </v-btn>
              <div class="text-right">
                <v-btn
                  text
                  color="primary"
                  @click="registerStep++"
                >
                  还没账号？马上注册 >>
                </v-btn>
              </div>
            </v-card-text>
          </v-window-item>

          <!-- 注册用户名 -->
          <v-window-item :value="2">
            <v-card>
              <v-card-text>
                <v-form v-model="registerForm.accountValid" ref="userReForm">
                  <v-row>
                    <v-col cols="5">
                      <v-select
                        :items="items"
                        label="角色"
                        :rules="[rules.required]"
                        v-model="registerForm.role"
                      ></v-select>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        v-model="registerForm.account"
                        label="注册账号"
                        counter="15"
                        :rules="[rules.required, rules.accountLen, rules.accountChar]"
                        hint="至少6位，至多15位"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
                <span class="caption grey--text text--darken-1">
                  这是用来登录此网站的唯一账号。
                </span>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  class="primary"
                  @click="_checkAccount"
                  :disabled="!registerForm.accountValid"
                >
                  下一步
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-window-item>

          <!-- 注册密码 -->
          <v-window-item :value="3">
            <v-card>
              <v-card-text>
                <v-form v-model="registerForm.pwdValid">
                  <v-text-field
                    label="密码"
                    v-model="registerForm.password"
                    :rules="[rules.required, rules.pwdLen, rules.pwdChar]"
                    hint="密码至少6位,至多20位"
                    autocomplete="new-password"
                    :append-icon="registerForm.eye1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="registerForm.eye1 ? 'text' : 'password'"
                    @click:append="registerForm.eye1 = !registerForm.eye1"
                  ></v-text-field>
                  <v-text-field
                    label="确认密码"
                    v-model="registerForm.passwordR"
                    autocomplete="new-password"
                    :rules="[rules.required, rules.pwdLen, rules.pwdChar]"
                    :append-icon="registerForm.eye2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="registerForm.eye2 ? 'text' : 'password'"
                    @click:append="registerForm.eye2 = !registerForm.eye2"
                  ></v-text-field>
                </v-form>
                <v-btn
                  class="primary mt-2"
                  block
                  @click="register"
                  :disabled="!registerForm.pwdValid"
                >
                  注册
                </v-btn>
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- 注册成功 -->
          <v-window-item :value="4">
            <div class="pa-4 text-center">
              <h3 class="title font-weight-light mb-2">
                欢迎使用本系统
              </h3>
              <span class="caption grey--text">注册成功！马上去登录吧！</span>
              <v-spacer></v-spacer>
              <v-btn class="primary mt-3" @click="nextStep">去登陆</v-btn>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import * as API from '../service/api';

export default {
  data() {
    return {
      registerStep: 1,
      valid: false,
      loginForm: {
        account: '',
        password: '',
        eye: false
      },
      registerForm: {
        account: '',
        role: 0,
        password: '',
        passwordR: '',
        accountValid: false,
        pwdValid: false,
        eye1: false,
        eye2: false
      },
      rules: {
        required: (v) => !!v || "必填",
        accountLen: v => v.length >= 6 && v.length <= 15 || "账号长度只能是6-15",
        accountChar: v => /[a-z0-9]{6,15}/.test(v) || "账号只能包含小写字母和数字",
        pwdLen: v => v.length >= 8 && v.length <= 20 || "密码长度只能是8-20位",
        pwdChar: v => /\w{8,20}/.test(v) || "密码只能由数字字母下划线组成"
      },
      items: [
        {
          text: '自由职业者',
          value: 2
        },
        {
          text: '客户',
          value: 3
        },
      ]
    }
  },
  created() {
    
  },
  methods: {
    nextStep() {
      this.registerStep = ++this.registerStep % 5;
    },
    prevStep() {
      this.registerStep--;
    },
    _checkAccount() {
      const {account} = this.registerForm
      API.checkAccountValid({
        account
      }).then(res => {
        if(res.data.valid) {
          this.nextStep()
        } else {
          this.$hot.showErrorSnackbar('用户名已存在')
        }
      }).catch(err => {
        console.log(err);
      })
    },
    register() {
      const {role, account, password, passwordR} = this.registerForm
      if(password !== passwordR) {
        this.$hot.showErrorSnackbar('两次输入的密码不一致')
        return;
      }
      API.register({
        account,
        password,
        role
      }).then(() => {
        this.nextStep();
        this.registerForm = {
          account: '',
          role: 0,
          password: '',
          passwordR: '',
          accountValid: false,
          pwdValid: false,
          eye1: false,
          eye2: false
        }
      }).catch(err => {
        console.log(err);
        this.$hot.showErrorSnackbar('注册失败')
      })
    },
    login() {
      const {account, password} = this.loginForm
      API.login({
        account,
        password
      }).then(res => {
        localStorage.setItem('token', res.data.token)
        this.$hot.showSuccessSnackbar('登录成功')
        switch(parseInt(res.data.role)) {
          case 1: 
            this.$router.replace('/user/userManagement')
            break;
          case 2:
            this.$router.replace('/user/addService')
            break;
          case 3:
            this.$router.replace('/user/serviceStore')
            break;
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  computed: {
    title() {
      return this.registerStep === 1 ? '登录' : '注册';
    },
    showBack() {
      return this.registerStep !== 1 && this.registerStep !== 4
    }
  }
}
</script>

<style>

</style>