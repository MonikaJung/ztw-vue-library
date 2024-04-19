<template>
    <div class="welcome-page">
        <h1>Welcome to the Library</h1>
        <p>Choose your <strong>user account</strong> in the top right corner and explore!</p>
    </div>
</template>

<script>
export default {
    name: 'WelcomePage',
};
</script>

<style scoped>
.welcome-page {
    text-align: center;
    margin-top: 50px;
}

h1 {
    color: rgb(221, 233, 255);
    font-size: 50px;
    margin-bottom: 20px;
}

p {
    color: #abc1d8;
    font-size: 30px;
    margin-bottom: 30px;
}
</style>