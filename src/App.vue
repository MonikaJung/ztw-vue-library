<template>
  <TabsBar :tabsSource="tabs" :clientsSource="clients" @change:tab="changeTab" @change:client="changeClient" />
  <BooksListPage v-if="!adminLogged"/>
  <BooksAdminPage v-if="adminLogged"/>
</template>

<script>
import BooksListPage from './pages/BooksListPage.vue'
import BooksAdminPage from './pages/BooksAdminPage.vue'
import TabsBar from './components/TabsBar.vue';

export default {
  name: 'app',
  components: {
    BooksListPage,
    BooksAdminPage,
    TabsBar,
  },
  data() {
    return {
      chosenClientId: 0,
      chosenTabId: 1,
      adminLogged: true,
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
      this.chosenTabId = chosenTabId
    },
    changeClient(chosenClientId) {
      this.chosenClientId = chosenClientId
      console.log(chosenClientId + " cl " + this.chosenClientId)
      if (chosenClientId == 0){
        this.adminLogged = true
      }
      else{
        this.adminLogged = false
      }
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
.hidden {
  visibility: hidden;
}
.visable {
  visibility: visible;
}
</style>
