<template>
    <div class="book-form">
        <form @submit.prevent="handleSubmit">
            <label>Book title</label>
            <input v-model="book.title" type="text" :class="{ 'has-error': submitting && invalidTitle }" />
            <label>Author name</label>
            <input v-model="book.author.name" type="text" :class="{ 'has-error': submitting && invalidName }" />
            <label>Author surname</label>
            <input v-model="book.author.surname" type="text" :class="{ 'has-error': submitting && invalidSurname }" />
            <label>Author penname (optional)</label>
            <input v-model="book.author.penName" type="text"
                :class="{ 'has-error': submitting && invalidName && invalidSurname }" />
            <label>Pages count</label>
            <input v-model="book.pages" type="number" min="1" :class="{ 'has-error': submitting && invalidPages }" />
            <p v-if="error && submitting" class="error-message">
                Please, fill highlighted fields.
            </p>
            <p v-if="success" class="success-message">
                Book was correctly saved.
            </p>
            <button type="submit">Add book</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'book-form',
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            book: {
                title: '',
                author: {
                    name: '',
                    surname: '',
                    penName: '',
                },
                pages: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true
            this.clearStatus()
            
            if (this.invalidName || this.invalidSurname || this.invalidTitle || this.invalidPages) {
                this.error = true
                return
            }
            if (this.book.author.penName == '') {
                this.book.author.penName = this.book.author.name + ' ' + this.book.author.surname
            }
            this.$emit('add:book', this.book)
            console.log(this.book)
            this.book = {
                title: '',
                author: {
                    id: '',
                    name: '',
                    surname: '',
                    penName: '',
                },
                pages: '',
            }
            this.error = false
            this.success = true
            this.submitting = false
        },
        clearStatus() {
            this.success = false
            this.error = false
        },
    },
    computed: {
        invalidTitle() {
            return this.book.title === ''
        },
        invalidName() {
            return this.book.author.name === ''
        },
        invalidSurname() {
            return this.book.author.surname === ''
        },
        invalidPages() {
            return this.book.pages === ''
        },
    },
}
</script>

<style scoped>
.book-form {
    width: 80%;
    margin: 0 auto;
}

.book-form form {
    background-color: #212529;
    padding: 20px;
    border-radius: 8px;
}

.book-form label {
    color: #ffffff;

}

.book-form input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    background-color: #343a40;
    color: #ffffff;
}

.book-form input:focus {
    outline: none;
    border: 2px solid #007bff;
}

.book-form input.has-error {
    border: 2px solid  #dc3545;
}

.error-message,
.success-message {
    color: #dc3545;
    margin-top: 5px;
}

.success-message {
    color: #28a745;
}

.book-form button {
    width: 70%;
    margin-bottom: 10px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s, box-shadow 0.2s;
    border-radius: 5px;
    outline: none;
}
.book-form button:hover {
    background-color: #0056b3;
}
.book-form button:active {
    background-color: #004085;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
}
.book-form button:disabled {
    background-color: #5a6268;
    color: #ced4da;
    cursor: not-allowed;
}
</style>