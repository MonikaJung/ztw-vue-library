<template>
    <div name="author-list-container">
        <div class="header-with-button table">
            <h1>Authors</h1>
            <button class="primary-button" @click="showAddForm">Add Author</button>
        </div>
        <AuthorsList :authorsSource="authors"/>
    </div>
</template>

<script>
import AuthorsList from '../components/AuthorsList.vue'

export default {
    name: 'authors-page-admin',
    props: {
        clientId: Number,
    },
    components: {
        AuthorsList,
    },
    data() {
        return {
            authors: [
                {
                    id: 1,
                    name: 'author1',
                    surname: '124',
                    penName: 'author1 1234'
                },
            ],
        }
    },
    methods: {
        async getAuthors() {
            try {
                const response = await fetch('http://localhost:8080/authors')
                const data = await response.json()
                this.authors = data
            } catch (error) {
                console.error(error)
            }
        },
    },
    mounted() {
        this.getAuthors()
    },
}
</script>

<style>
/* Style the same as in BooksPageAdmin.vue */
</style>