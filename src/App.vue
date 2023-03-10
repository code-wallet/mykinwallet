<script lang="ts">
import { ref } from 'vue';

import PageHome from './components/PageHome.vue';
import PageConnectLedger from './components/PageConnectLedger.vue';
import PageSignTransaction from './components/PageSignTransaction.vue';

enum AppState {
  Landing,
  ConnectLedger,
  SignTransaction,
}

const appState = ref(AppState.Landing);

export default {
  components:{
    PageHome,
  },

  setup() {
    return {
    };
  },

  mounted() {
    // TODO: maybe use a router instead? Keeping it simple for now, until we
    // have more pages.
    const goto = (page: AppState) => {
      window.scrollTo(0, 0);
      history.pushState({}, '');
      appState.value = page;
    }

    // Handle the back button
    window.addEventListener('popstate', (event) => {
      switch (appState.value) {
        case AppState.ConnectLedger:
        case AppState.SignTransaction:
        default:
          appState.value = AppState.Landing;
          break;
      }
    });


    this.$bus.on('goto:home', () => {
      goto(AppState.Landing);
    });

    this.$bus.on('goto:connectledger', () => {
      goto(AppState.ConnectLedger);
    });

    this.$bus.on('goto:signtransaction', () => {
      goto(AppState.SignTransaction);
    });
  },

  methods: {
    activePage() {
      switch (appState.value) {
        case AppState.Landing:
          return PageHome;
        case AppState.ConnectLedger:
          return PageConnectLedger;
        case AppState.SignTransaction:
          return PageSignTransaction;
        default:
          return PageHome;
      }
    }
  }
}
</script>

<template>
  <transition mode="out-in">
    <component :is="activePage()"/>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

