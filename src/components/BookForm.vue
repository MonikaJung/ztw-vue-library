<template>
    <div class="book-form">
        <form @submit.prevent="handleSubmit">
            <label>Book title</label><br>
            <input v-model="book.title" type="text" :class="{ 'has-error': submitting && invalidTitle }" /><br>
            <label>Select Author</label><br>
            <select v-model="selectedAuthor" :class="{ 'has-error': submitting && invalidAuthor }">
                <option key="" value="" disabled selected hidden>Select an author...</option>
                <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.id }}: {{ author.penName }}</option>
            </select><br>
            <label>Pages count</label><br>
            <input v-model="book.pages" type="number" min="1" :class="{ 'has-error': submitting && invalidPages }" />
            <p v-if="error && submitting" class="error-message">
                Please, fill highlighted fields.
            </p>
            <p v-if="success" class="success-message">
                Book was correctly saved.
            </p>
            <button type="submit">{{ submitText }}</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'book-form',
    props: {
        submitText: String,
    },
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            selectedAuthor: '',
            book: {
                title: '',
                author: '',
                pages: '',
            },
            authors: [
                {
                    id: 1,
                    name: 'Author1',
                    surname: '123',
                    penName: 'Author1 133432'
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
        handleSubmit() {
            this.submitting = true
            this.clearStatus()
            
            if (this.invalidName || this.invalidSurname || this.invalidTitle || this.invalidPages) {
                this.error = true
                return
            }
            this.book.author = this.authors.find(a => a.id === this.selectedAuthor)
            
            this.$emit('submit:form', this.book)
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
    mounted() {
        this.getAuthors()
    },
    computed: {
        invalidTitle() {
            return this.book.title === ''
        },
        invalidAuthor() {
            return !this.selectedAuthor
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
    border: 2px solid #004085;
}

.book-form label {
    color: #ffffff;

}

.book-form input, .book-form select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: none;
    border-radius: 5px;
    background-color: #343a40;
    color: #ffffff;
}

.book-form input {
    width: 98%;
    margin-right: 40px;
}

.book-form input:focus, .book-form select:focus {
    outline: none;
    border: 2px solid #007bff;
}

.book-form input.has-error, .book-form select.has-error {
    border: 2px solid #dc3545;
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
