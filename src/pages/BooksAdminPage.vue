<template>
    <h1>Add book</h1>
    <BookForm @add:book="addBook" />
    <BooksList :booksSource="books" />
</template>

<script>
import BooksList from '../components/BooksList.vue'
import BookForm from '../components/BookForm.vue';

export default {
    name: 'books-admin-page',
    components: {
        BooksList,
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
        }
    },
    methods: {
        async addBook(book) {
            book.author.id = 200
            try {
                const response = await fetch('http://localhost:8080/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                })
                const data = await response.json()
                if (!response.ok) {
                    console.log('error: ' + data.error + ', message: ' + data.message)
                }
            } catch (error) {
                console.error(error)
            }
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