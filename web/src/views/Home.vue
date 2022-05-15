<template>
  <div class="home full-height">
    <v-app-bar app></v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click.stop="mini = !mini"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ $store.state.user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ $store.state.user.account }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item 
          v-for="item in getNav"
          :key="item.name"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-footer absolute class="text-center">{{getRole}}</v-footer>
    </v-navigation-drawer>

    <v-container fluid class="full-height">
      <router-view />
    </v-container>
  </div>
</template>

<script>
import * as API from '../service/api';

export default {
  name: 'Home',
  components: {
    
  },
  data: () => ({
    drawer: true,
    mini: true
  }),
  created() {
    API.getUserInfo().then(res => {
      this.$hot.update('user', res.data || {})
    })
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$hot.update('user', {})
      this.$router.replace('/login')
    }
  },
  computed: {
    getRole() {
      return (['员工', '自由职业者', '客户'])[this.$store.state.user.role-1]
    },
    getNav() {
      switch(this.$store.state.user.role) {
        case 1: return [
            {
              name: '用户管理',
              icon: 'mdi-account-multiple',
              route: 'userManagement'
            },
            {
              name: '项目管理',
              icon: 'mdi-folder-table',
              route: 'projects'
            }
          ]
        case 2: return [
            {
              name: '发布服务',
              icon: 'mdi-file-plus',
              route: 'addService'
            },
            {
              name: '发布历史',
              icon: 'mdi-calendar-clock',
              route: 'serviceHistory'
            }
          ]
        case 3: return [
            {
              name: '服务商城',
              icon: 'mdi-store',
              route: 'serviceStore'
            },
            {
              name: '订单',
              icon: 'mdi-cart',
              route: 'cart'
            }
          ]
        default: return []
      }
    }
  }
}
</script>
