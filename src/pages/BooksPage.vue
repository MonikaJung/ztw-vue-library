<template>
    <BooksUserPage v-if="!isAdmin" buttonText="Borrow!" buttonHeader="Borrow" :clientId=clientId />
    <BooksAdminPage v-if="isAdmin" buttonText="Edit" buttonHeader="Edit"/>
</template>

<script>
import BooksAdminPage from './BooksPageAdmin.vue';
import BooksUserPage from './BooksPageUser.vue';

export default {
    name: 'books-page',
    props: {
        clientId: Number,
        isAdmin: Boolean,
    },
    components: {
        BooksUserPage,
        BooksAdminPage,
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