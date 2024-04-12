<template>
  <TabsBar :tabsSource="tabs" @change:tab="changeTab"/>
  <h1>Books</h1>
  <BooksList :booksSource="books" />
</template>

<script>
import TabsBar from './components/TabsBar.vue';
import BooksList from './components/BooksList.vue'

export default {
  name: 'app',
  components: {
    BooksList,
    TabsBar,
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
          name: "Authors"
        }, {
          id: 3,
          name: "Users"
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
    }
  },
  mounted() {
    this.getBooks()
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
