<template>
    <h1>My borrowed books</h1>
    <Popup v-if="popup.visable" :message="popup.message" :type="popup.type" @close="closePopup" />
    <BooksList :booksSource="books" buttonText="Return" columnHeader="Return" @clicked:button="returnBook"
        :buttonWhenBookAvailable="false" />
</template>

<script>
import BooksList from '../components/BooksList.vue';
import Popup from '../components/Popup.vue';

export default {
    name: 'my-books-page-user',
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
        async getUserBooks() {
            try {
                const response = await fetch(`http://localhost:8080/client/${this.clientId}/books`)
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
        async returnBook(book) {
            try {
                const response = await fetch(`http://localhost:8080/client/${this.clientId}/return/${book.id}`)
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
                    this.getUserBooks()
                }
            } catch (error) {
                console.error(error)
            }
        },
        closePopup() {
            this.popup.visable = false
        },
    },
    watch: {
        clientId() {
            this.getUserBooks()
            console.log(this.clientId + ' changed')
        }
    },
    mounted() {
        this.getUserBooks()
    },
}
</script>

<style>
</style>