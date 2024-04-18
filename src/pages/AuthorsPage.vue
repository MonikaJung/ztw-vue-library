<template>
    <h1>Authors</h1>
    <AuthorsList :authorsSource="authors"/>
</template>

<script>
import AuthorsList from '../components/AuthorsList.vue'

export default {
    name: 'authors-page',
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
                {
                    id: 2,
                    name: 'author2',
                    surname: '124',
                    penName: 'author2 1234'
                },
                {
                    id: 3,
                    name: 'author3',
                    surname: '124',
                    penName: 'author3 1234'
                },
            ],
        }
    },
    methods: {
        async getAuthors() {
            try {
                const response = await fetch('http://localhost:8080/authors')
                const data = await response.json()
                this.books = data
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
</style>