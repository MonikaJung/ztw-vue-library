<template>
    <AuthorsPageAdmin v-if="isAdmin"/>
    <AuthorsPageUser v-if="!isAdmin" :clientId="clientId"/>
</template>

<script>
import AuthorsPageAdmin from '../pages/AuthorsPageAdmin.vue'
import AuthorsPageUser from '../pages/AuthorsPageUser.vue'

export default {
    name: 'authors-page',
    props: {
        clientId: Number,
        isAdmin: Boolean,
    },
    components: {
        AuthorsPageAdmin,
        AuthorsPageUser,
    },
}
</script>

<style>
</style>