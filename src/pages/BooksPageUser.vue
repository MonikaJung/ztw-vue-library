<template>
    <h1>Borrow books</h1>
    <Popup v-if="popup.visable" :message="popup.message" :type="popup.type" @close="closePopup" />
    <BooksList :booksSource="books" buttonText="Borrow!" columnHeader="Borrow" @clicked:button="borrowBook"
        :buttonWhenBookAvailable="true" />
</template>

<script>
import BooksList from '../components/BooksList.vue';
import Popup from '../components/Popup.vue';

export default {
    name: 'books-page-user',
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
        async getBooks() {
            try {
                const response = await fetch('http://localhost:8080/books')
                const data = await response.json()
                this.books = data
            } catch (error) {
                console.error(error)
            }
        },
        async borrowBook(book) {
            try {
                const response = await fetch(`http://localhost:8080/client/${this.clientId}/borrow/${book.id}`)
                const data = await response.json()
                if (!response.ok) {
                    this.popup.visable = true
                    this.popup.message = data.message
                    this.popup.type = 'error'
                    console.log('error: ' + data.error + ', message: ' + data.message)
                }
                else {
                    this.popup.visable = true
                    this.popup.message = data.message
                    this.popup.type = 'success'
                    console.log('Success: ' + data.message)
                    this.getBooks()
                }
            } catch (error) {
                console.error(error)
            }
        },
        closePopup() {
            this.popup.visable = false;
        },
    },
    mounted() {
        this.getBooks()
    },
}
</script>

<style>
</style>