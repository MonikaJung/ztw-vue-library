<template>
    <button>Add book</button>
    <Popup v-if="popup.visable" :message="popup.message" :type="popup.type" @close="closePopup" />
    <BookForm v-if="state.isAdding" submitText="Add book" @add:book="addBook" />
    <h1>Edit Books</h1>
    <BooksList :booksSource="books" buttonText="Edit book" buttonHeader="Edit" @clicked:button="editBook"
        :buttonWhenBookAvailable="true" />
</template>

<script>
import BooksList from '../components/BooksList.vue'
import BookForm from '../components/BookForm.vue';
import Popup from '../components/Popup.vue';

export default {
    name: 'books-page-admin',
    props: {
        clientId: Number,
    },
    components: {
        BooksList,
        BookForm,
        Popup,
    },
    data() {
        return {
            state: {
                isAdding: true,
                isEditing: false,
                isReading: true,
                isRemoving: false
            },
            popup: {
                visable: false,
                message: '',
                type: ''
            },
            books: [
                {
                    id: 1,
                    title: 'Book1',
                    author: { penName: 'Author1' },
                    pages: 100,
                    available: true
                },
            ],
        }
    },
    methods: {
        async getBooks() {
            try {
                const response = await fetch('http://localhost:8080/books')
                const data = await response.json()
                this.books = data
            } catch (error) {
                console.error(error)
            }
        },
        async addBook(book) {
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
                    this.popup.visable = true
                    this.popup.message = data.message
                    this.popup.type = 'error'
                    console.log('error: ' + data.error + ', message: ' + data.message)
                }
                else {
                    this.popup.visable = true
                    this.popup.message = 'New book "' + book.title + '" by ' + book.author.penName + ' was added to the library.'
                    this.popup.type = 'success'
                    console.log('Success: ' + data.message)
                }
            } catch (error) {
                console.error(error)
            }
        },
        async editBook(book) {

        },
    },
    closePopup() {
        this.popup.visable = false;
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