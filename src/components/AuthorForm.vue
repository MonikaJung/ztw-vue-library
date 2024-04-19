<template>
    <div class="author-form">
        <form @submit.prevent="handleSubmit">
            <label>Author name</label><br>
            <input v-model="author.name" type="text" :class="{ 'has-error': submitting && invalidname }" /><br>
            <label>Author surname</label><br>
            <input v-model="author.surname" type="text" :class="{ 'has-error': submitting && invalidsurname }" /><br>
            <label>Author penname (optional)</label><br>
            <input v-model="author.penName" type="text" :class="{ 'has-error': submitting && invalidPenName }" />
            <p v-if="error && submitting" class="error-message">
                Please, fill highlighted fields.
            </p>
            <p v-if="success" class="success-message">
                Author was correctly saved.
            </p>
            <button type="submit">{{ submitText }}</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'author-form',
    props: {
        submitText: String,
        authorData: Object,
    },
    data() {
        return {
            submitting: false,
            error: false,
            success: false,
            author: {
                name: '',
                author: '',
                surname: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            this.submitting = true
            this.clearStatus()

            if (this.invalidName || this.invalidSurname || this.invalidPenName) {
                this.error = true
                return
            }

            this.$emit('submit:form', this.author)
            this.author = {
                id: '',
                name: '',
                surname: '',
                penName: '',
            }
            this.error = false
            this.success = true
            this.submitting = false
        },
        clearStatus() {
            this.success = false
            this.error = false
        },
        setFormFieldsFromAuthorData() {
            if (this.authorData) {
                this.author.id = this.authorData.id || '';
                this.author.name = this.authorData.name || '';
                this.selectedAuthor = this.authorData.author.id || '';
                this.author.surname = this.authorData.surname || '';
            }
        },
    },
    mounted() {
        this.setFormFieldsFromAuthorData();
    },
    computed: {
        invalidName() {
            return this.author.name === ''
        },
        invalidPenName() {
            return this.author.penName === ''
        },
        invalidSurname() {
            return this.author.surname === ''
        },
    },
}
</script>

<style scoped>
.author-form {
    width: 80%;
    margin: 0 auto;
}

.author-form form {
    background-color: #212529;
    padding: 20px;
    border-radius: 8px;
    border: 2px solid #004085;
}

.author-form label {
    color: #ffffff;
    font-size: 18px;
}

.author-form input,
.author-form select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: none;
    border-radius: 5px;
    background-color: #343a40;
    color: #ffffff;
    font-size: 18px;
}

.author-form input {
    width: 98%;
    margin-right: 40px;
}

.author-form input:focus,
.author-form select:focus {
    outline: none;
    border: 2px solid #007bff;
}

.author-form input.has-error,
.author-form select.has-error {
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

.author-form button {
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
    font-size: 20px;
}

.author-form button:hover {
    background-color: #0056b3;
}

.author-form button:active {
    background-color: #004085;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.author-form button:disabled {
    background-color: #5a6268;
    color: #ced4da;
    cursor: not-allowed;
}
</style>
