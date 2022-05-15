<template>
  <v-card class="full-height">
    <v-card-title class="text-h5 font-weight-black">发布历史</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        height="68vh"
        :footer-props="{
          itemsPerPageOptions: [10, 15]
        }"
      >
      
        <template v-slot:[`item.introduction`]="{ item }">
          {{ item.introduction || '无' }}
        </template>

        <template v-slot:[`item.buyer`]="{ item }">
          <div v-if="item.buyer" class="d-flex">
            {{ item.buyer.name }}

            <div class="text-center">
              <v-menu
                :close-on-content-click="false"
                :nudge-width="200"
                offset-x
                :nudge-left="200"
                max-width="200px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn x-small class="ml-5" v-bind="attrs" v-on="on" icon>
                    <v-icon> mdi-menu </v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-title>{{ item.buyer.name }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        账号：{{ item.buyer.account }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        性别：{{ item.buyer.sex }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        年龄：{{ item.buyer.age }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
        </template>

        <template v-slot:[`item.sold`]="{ item }">
          <span :class="item.sold ? 'red--text' : 'green--text'">{{ item.sold ? '已售' : '在售' }}</span>
        </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { headersArrToHeadersMap, generateHeaders } from "@/utils/tableConstant";
import * as API from '@/service/api';

export default {
  data() {
    return {
      desserts: []
    }
  },
  created() {
    API.getServiceByUserId().then(res => {
      this.desserts = res.data
    }).catch(err => {
      console.log(err);
    })
  },
  computed: {
    headers() {
      return generateHeaders(this.desserts[0], headersArrToHeadersMap('SERVICE_HISTORY'))
    }
  }
}
</script>

<style>

</style>