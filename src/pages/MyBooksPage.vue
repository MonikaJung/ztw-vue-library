<template>
    <MyBooksPageUser v-if="!isAdmin" :clientId=clientId />
    <MyBooksPageAdmin v-if="isAdmin" />
</template>

<script>
import MyBooksPageAdmin from './MyBooksPageAdmin.vue';
import MyBooksPageUser from './MyBooksPageUser.vue';

export default {
    name: 'my-books-page',
    props: {
        clientId: Number,
        isAdmin: Boolean,
    },
    components: {
        MyBooksPageUser,
        MyBooksPageAdmin,
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