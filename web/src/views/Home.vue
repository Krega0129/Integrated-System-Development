<template>
  <div class="home full-height">
    <!-- <v-app-bar app></v-app-bar> -->
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list>
        <v-list-item class="px-2">
          <avatar :sex="$store.state.user.sex"></avatar>
          <v-spacer></v-spacer>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ $store.state.user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              $store.state.user.account
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="dialog = true"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>修改个人信息</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="logout"
              >
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </template>
            <span>退出登陆</span>
          </v-tooltip>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          v-for="item in getNav"
          :key="item.name"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-footer absolute class="text-center">{{ roleFormatter($store.state.user.role) }}</v-footer>
    </v-navigation-drawer>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>修改个人信息</v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="user.name"
                  label="用户名"
                  counter="15"
                  :rules="[rules.required, rules.nameLen]"
                  hint="最长15位"
                ></v-text-field>
                <v-text-field
                  v-model="user.age"
                  label="年龄"
                  :rules="[rules.required, rules.age]"
                  hint="0~100"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-radio-group
                  v-model="user.sex"
                  row
                >
                  <v-radio
                    label="男"
                    value="1"
                  ></v-radio>
                  <v-radio
                    label="女"
                    value="2"
                  ></v-radio>
                </v-radio-group>
                <v-select
                  :items=[]
                  :label="role"
                  :value="user.role"
                  :disabled="true"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="error"
            @click="cancel"
          >
            取消
          </v-btn>
          <v-btn 
            class="success"
            :disabled="!valid"
            @click="_updateUserInfo"
          >
            确定
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container fluid class="full-height">
      <router-view />
    </v-container>
  </div>
</template>

<script>
import * as API from "../service/api";
import { roleFormatter } from '@/utils';

export default {
  name: "Home",
  data: () => ({
    drawer: true,
    mini: true,
    dialog: false,
    valid: false,
    user: {},
    rules: {
      required: v => !!v || '必填',
      nameLen: v => v.length <= 15 || '',
      age: v => v >= 0 && v <= 100 || '不在范围内'
    }
  }),
  async created() {
    await this._getUserInfo()
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$hot.update("user", {});
      this.$router.replace("/login");
    },
    async _getUserInfo() {
      await API.getUserInfo().then((res) => {
        this.$hot.update("user", res.data || {});
        this.user = Object.assign({}, this.$store.state.user)
      });
    },
    _updateUserInfo() {
      API.updateUserInfo(this.user).then(res => {
        this._getUserInfo()
        this.$hot.showSuccessSnackbar('修改成功')
        this.dialog = false
      }).catch(err => {
        this.$hot.showErrorSnackbar(err.message || '修改失败')
      })
    },
    roleFormatter,
    cancel() {
      this.user = Object.assign({}, this.$store.state.user)
      this.dialog = false
    }
  },
  computed: {
    role() {
      return this.roleFormatter(this.user.role)
    },
    getNav() {
      switch (this.$store.state.user.role) {
        case 1:
          return [
            {
              name: "用户管理",
              icon: "mdi-account-multiple",
              route: "userManagement",
            },
            {
              name: "项目管理",
              icon: "mdi-folder-table",
              route: "projectManagement",
            },
          ];
        case 2:
          return [
            {
              name: "发布服务",
              icon: "mdi-file-plus",
              route: "addService",
            },
            {
              name: "发布历史",
              icon: "mdi-calendar-clock",
              route: "serviceHistory",
            },
          ];
        case 3:
          return [
            {
              name: "服务商城",
              icon: "mdi-store",
              route: "serviceStore",
            },
            {
              name: "订单",
              icon: "mdi-cart",
              route: "serviceOrder",
            },
          ];
        default:
          return [];
      }
    }
  },
};
</script>
