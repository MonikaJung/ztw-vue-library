<template>
    <h1>Books left in the library</h1>
    <Popup v-if="popup.visable" :message="popup.message" :type="popup.type" @close="closePopup" />
    <BooksList :booksSource="books" buttonText="Edit" buttonHeader="Edit" @clicked:button="editBook"
        :buttonWhenBookAvailable="true" />
</template>

<script>
import BooksList from '../components/BooksList.vue';
import Popup from '../components/Popup.vue';

export default {
    name: 'my-books-page-admin',
    props: {
        clientId: Number,
    },
    components: {
        BooksList,
        Popup,
    },
    data() {
        return {
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
        async getAvailableBooks() {
            try {
                const response = await fetch(`http://localhost:8080/books/available`)
                const data = await response.json()
                this.books = data
                if (!response.ok) {
                    this.popup.visable = true
                    this.popup.message = data.message
                    this.popup.type = 'error'
                    console.log('error: ' + data.error + ', message: ' + data.message)
                }
            } catch (error) {
                console.error(error)
            }
        },
        editBook(){

        },
        closePopup() {
            this.popup.visable = false;
        },
    },
    mounted() {
        this.getAvailableBooks()
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