<template>
  <TabsBar></TabsBar>  
  <h1>Books</h1>
  <BooksList :booksSource="books" />
</template>

<script>
import BooksList from './components/BooksList.vue'
import TabsBar from './components/TabsBar.vue'

export default {
  name: 'app',
  components: {
    BooksList,
    TabsBar
  },
  data() {
    return {
      books: [
        {
          id: 1,
          title: 'Adam Słodowy',
          author: {penName: 'adam.slodowy@zrobtosam.pl'},
          pages: 267,
          available: true
        },
        {
          id: 2,
          title: 'Michał Studencki',
          author: {penName: 'adam.slodowy@zrobtosam.pl'},
          pages: 267,
          available: false
        },
        {
          id: 3,
          title: 'Kamila Napokaz',
          author: {penName: 'adam.slodowy@zrobtosam.pl'},
          pages: 267,
          available: true
        },
      ]
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
