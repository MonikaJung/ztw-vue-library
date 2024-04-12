<template>
  <TabsBar :tabsSource="tabs" :clientsSource="clients" @change:tab="changeTab"/>
  <h1>Books</h1>
  <BookForm @add:book="addBook"/>
  <BooksList :booksSource="books" />
</template>

<script>
import TabsBar from './components/TabsBar.vue'
import BooksList from './components/BooksList.vue'
import BookForm from './components/BookForm.vue';

export default {
  name: 'app',
  components: {
    BooksList,
    TabsBar,
    BookForm,
  },
  data() {
    return {
      books: [
        {
          id: 1,
          title: 'Book1',
          author: { penName: 'Author1' },
          pages: 100,
          available: true
        },
        {
          id: 2,
          title: 'Book2',
          author: { penName: 'Author2' },
          pages: 200,
          available: false
        },
        {
          id: 3,
          title: 'Book3',
          author: { penName: 'Author3' },
          pages: 300,
          available: true
        },
      ],
      tabs: [
        {
          id: 1,
          name: "Library"
        }, {
          id: 2,
          name: "My books"
        }
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
    addBook(book) {
      this.books = [...this.books, book]
    },
    async getBooks() {
      try {
        const response = await fetch('http://localhost:8080/books')
        const data = await response.json()
        this.books = data
      } catch (error) {
        console.error(error)
      }
    },
    changeTab(chosenTabId){
      console.log(chosenTabId)
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
    this.getBooks()
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
