<template>
  <div>
    <TabsBar :tabsSource="tabs" :clientsSource="clients" @change:tab="changeTab" @change:client="changeClient" />
    <router-view />
  </div>
</template>

<script>
import TabsBar from './components/TabsBar.vue';

export default {
  name: 'App',
  components: {
    TabsBar,
  },
  data() {
    return {
      chosenClientId: 0,
      adminLogged: true,
      tabs: [
        { id: 1, name: "Library" },
        { id: 2, name: "Authors" },
        { id: 3, name: "My books" },
      ],
      clients: [
        { id: 1, name: "Name", surname: "Surname", borrowedBooks: [] }
      ],
    };
  },
  methods: {
    changeTab(chosenTabId) {
      this.chosenTabId = chosenTabId;
    },
    changeClient(chosenClientId) {
      this.chosenClientId = chosenClientId;
      this.adminLogged = chosenClientId === 0;
    },
    async getClients() {
      try {
        const response = await fetch('http://localhost:8080/clients');
        const data = await response.json();
        this.clients = data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.getClients();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.hidden {
  visibility: hidden;
}
.visable {
  visibility: visible;
}
</style>
