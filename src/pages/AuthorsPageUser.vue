<template>
    <h1>Authors</h1>
    <AuthorsList :authorsSource="authors" />
</template>

<script>
import AuthorsList from '../components/AuthorsList.vue'

export default {
    name: 'authors-page-user',
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