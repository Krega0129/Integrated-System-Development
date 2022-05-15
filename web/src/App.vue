<template>
  <v-app>
    <v-main>
      <router-view/>
      <loading/>
      <alert/>
    </v-main>
  </v-app>
</template>

<script>
import Alert from './components/alert.vue';
import loading from './components/loading.vue';

export default {
  components: { loading, Alert },
  name: 'App',

  data: () => ({
    
  }),
};
</script>
