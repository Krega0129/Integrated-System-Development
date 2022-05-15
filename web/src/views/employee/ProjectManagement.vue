<template>
  <v-card class="full-height">
    <v-toolbar dense flat>
      <v-card-title>项目管理</v-card-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{attrs, on}">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="success"
          >
            新增分类
          </v-btn>
        </template>
        <v-card>
          <v-card-title>新增分类</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model.trim="category"
                label="分类名"
                hint="10个字以内"
                counter="10"
                :rules="[rules.required, rules.categoryLen]"
                class="mt-5"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="error"
              @click="dialog = false"
            >
              取消
            </v-btn>
            <v-btn 
              class="success"
              :disabled="!valid"
              @click="_addCategory"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="10"
        height="75vh"
        :footer-props="{
          itemsPerPageOptions: [10, 15]
        }"
      >
        <template v-slot:[`header.category`]>
          <v-select
            style="width: 80px"
            class="mb-n5"
            @change="_getProjectList"
            dense
            :items="items"
            label="分类"
            v-model="category"
          ></v-select>
        </template>

        <template v-slot:[`item.seller`]="{ item }">
          <div class="d-flex">
            {{ item.seller.name }}

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
                      <avatar :sex="item.seller.sex"></avatar>
                      <v-list-item-title>{{ item.seller.name }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        账号：{{ item.seller.account }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        性别：{{ item.seller.sex == 1 ? '男' : '女' }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        年龄：{{ item.seller.age }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </div>
          </div>
        </template>

        <template v-slot:[`item.category`]="{ item }">
          {{ categoryFormatter(item.category) }}
        </template>

        <template v-slot:[`item.releaseTime`]="{ item }">
          {{ timeFormatter(item.releaseTime) }}
        </template>

        <template v-slot:[`item.buyer`]="{ item }">
          <div class="d-flex">
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
                      <avatar :sex="item.buyer.sex"></avatar>
                      <v-list-item-title>{{ item.buyer.name }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        账号：{{ item.buyer.account }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        性别：{{ item.buyer.sex == 1 ? '男' : '女' }}
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

        <template v-slot:[`item.buyTime`]="{ item }">
          {{ timeFormatter(item.buyTime) }}
        </template>
        
      </v-data-table>
    </v-card-text>
  </v-card>  
</template>

<script>
import * as API from '@/service/api';
import { headersArrToHeadersMap, generateHeaders } from "@/utils/tableConstant";
import { timeFormatter, categoryFormatter } from '@/utils';

export default {
  data: () => ({
    desserts: [],
    items: [],
    category: '',
    dialog: false,
    valid: false,
    rules: {
      required: v => !!v || '必填',
      categoryLen: v => v.length <= 10 || ''
    }
  }),
  created() {
    this._getCategory()
    this._getProjectList()
  },  
  computed: {
    headers() {
      return generateHeaders(this.desserts[0], headersArrToHeadersMap('PROJECT_MANAGEMENT'), {
        sort: ['projectName', 'category', 'price', 'introduction', 'seller', 'releaseTime', 'buyer', 'buyTime'],
        sortable: false
      })
    }
  },
  methods: {
    _getProjectList() {
      API.getProjectList({
        category: this.category
      }).then(res => {
        this.desserts = res.data
      }).catch(err => {
        console.log(err);
      })
    },
    _getCategory() {
      API.getCategory().then(res => {
        this.$hot.update('category', res.data)
        this.items = [{text: '全部', value: 0}, ...res.data]
      }).catch(err => {
        console.log(err);
      })
    },
    timeFormatter,
    _addCategory() {
      API.addCategory({
        category: this.category
      }).then(res => {
        this.$hot.showSuccessSnackbar('新增分类成功')
        this.dialog = false
        this._getCategory()
      }).catch(err => {
        this.$hot.showErrorSnackbar(err.message)
        console.log(err);
      })
    },
    categoryFormatter
  }
}
</script>