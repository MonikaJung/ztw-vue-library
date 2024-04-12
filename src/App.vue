<template>
  <TabsBar :tabsSource="tabs" :clientsSource="clients" @changeTab="changeTab" @changeClient="changeClient" />
  <BooksAdminPage />
</template>

<script>
import BooksAdminPage from './pages/BooksAdminPage.vue'
import TabsBar from './components/TabsBar.vue';

export default {
  name: 'app',
  components: {
    BooksAdminPage,
    TabsBar,
  },
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: "Library"
        }, {
          id: 2,
          name: "My books"
        },{
          id: 3,
          name: "About"
        },
      ],
      clients: [
        {
          id: 1,
          name: "Name",
          surname: "Surname",
          borrowedBooks: []
        }
      ],
    }
  },
  methods: {
    changeTab(chosenTabId) {
      console.log(chosenTabId)
    },
    changeClient(chosenClientId) {
      console.log(chosenClientId)
    },
    async getClients() {
      try {
        const response = await fetch('http://localhost:8080/clients')
        const data = await response.json()
        this.clients = data
      } catch (error) {
        console.error(error)
      }
    }
  },
  mounted() {
    this.getClients()
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
