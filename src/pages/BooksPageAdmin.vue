<template>
    <Popup v-if="popup.visable" :message="popup.message" :type="popup.type" @close="closePopup" />

    <div name="book-list-container" v-if="!state.isAction">
        <div class="header-with-button table">
            <h1>All books in the library</h1>
            <button class="primary-button" @click="showAddForm">Add book</button>
        </div>
        <BooksList :booksSource="books" buttonText="Edit book" columnHeader="Edit" @clicked:button="showEditForm"
            :buttonWhenBookAvailable="true" />
    </div>

    <div name="add-book-container" v-if="state.isAction && state.isAdding">
        <div class="header-with-button form one-button">
            <button class="primary-button" @click="hideForm">Cancel</button>
            <h1>Add a new book</h1>
        </div>
        <BookForm submitText="Add book" @submit:form="addBook" bookData="" />
    </div>

    <div name="edit-book-container" v-if="state.isAction && state.isEditing">
        <div class="header-with-button form two-buttons">
            <button class="primary-button left" @click="hideForm">Cancel</button>
            <h1>Edit book</h1>
            <button class="primary-button delete right" @click="deleteBook">Delete book</button>
        </div>
        <BookForm submitText="Save changes" @submit:form="editBook" :bookData="bookToEdit" />
    </div>
</template>

<script>
import BooksList from '../components/BooksList.vue'
import BookForm from '../components/BookForm.vue';
import Popup from '../components/Popup.vue';

export default {
    name: 'books-page-admin',
    components: {
        BooksList,
        BookForm,
        Popup,
    },
    data() {
        return {
            state: {
                isAction: false,
                isAdding: false,
                isEditing: false,
            },
            popup: {
                visable: false,
                message: '',
                type: ''
            },
            books: [
                {
                    id: 1,
                    title: 'Book1',
                    author: { penName: 'Author1' },
                    pages: 100,
                    available: true
                },
            ],
            bookToEdit: ''
        }
    },
    methods: {
        async getBooks() {
            try {
                const response = await fetch('http://localhost:8080/books')
                const data = await response.json()
                this.books = data
            } catch (error) {
                console.error(error)
            }
        },
        async addBook(book) {
            console.log(book)
            try {
                const response = await fetch('http://localhost:8080/book', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(book)
                })
                const data = await response.json()
                if (!response.ok) this.showErrorPopup(data.message + ' (' + data.error + ')')
                else this.showSuccessPopup('New book "' + book.title + '" by ' + book.author.penName + ' was added to the library.')
                this.hideForm()
            } catch (error) {
                console.error(error)
            }
        },
        async editBook(book) {
            try {
                const response = await fetch(`http://localhost:8080/book/${book.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(book)
                })
                const data = await response.json()
                if (!response.ok) 
                    this.showErrorPopup(data.message + ' (' + data.error + ')')
                else 
                    this.showSuccessPopup('Book "' + book.title + '" by ' + book.author.penName + ' was updated.')
                this.hideForm()
            } catch (error) {
                console.error(error)
            }
        },
        async deleteBook() {
            try {
                const response = await fetch(`http://localhost:8080/book/${this.bookToEdit.id}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.bookToEdit)
                })
                const data = await response.json()
                if (!response.ok) 
                    this.showErrorPopup(data.message + ' (' + data.error + ')')
                else 
                    this.showSuccessPopup('Book "' + this.bookToEdit.title + '" by ' + this.bookToEdit.author.penName + ' was deleted.')
                this.hideForm()
            } catch (error) {
                console.error(error)
            }
        },
        showErrorPopup(message) {
            this.popup.visable = true;
            this.popup.message = message;
            this.popup.type = 'error';
        },
        showSuccessPopup(message) {
            this.popup.visable = true
            this.popup.message = message
            this.popup.type = 'success'
        },
        closePopup() {
            this.popup.visable = false;
        },
        clearState(isAction) {
            this.state.isAction = isAction
            this.state.isAdding = false
            this.state.isEditing = false
            this.state.isRemoving = false
        },
        showAddForm() {
            this.clearState(true)
            this.state.isAdding = true
        },
        showEditForm(book) {
            this.clearState(true)
            this.state.isEditing = true
            this.bookToEdit = book
        },
        hideForm() {
            this.clearState(false)
            this.bookToEdit = ''
            this.getBooks()
        },
    },
    mounted() {
        this.getBooks()
    },
}
</script>

<style>
.primary-button {
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

.primary-button:hover {
    background-color: #0056b3;
}

.primary-button:active {
    background-color: #004085;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.primary-button:disabled {
    background-color: #5a6268;
    color: #ced4da;
    cursor: not-allowed;
}

.primary-button.delete {
    background-color: #dc3545;
}

.primary-button.delete:hover {
    background-color: #c82333;
}

.primary-button.delete:active {
    background-color: #bd2130;
}

.primary-button.delete:disabled {
    background-color: #6c757d;
    color: #ced4da;
    cursor: not-allowed;
}

.header-with-button {
    display: flex;
    align-items: center;
}

.header-with-button h1 {
    flex: 1;
    text-align: center;
}

.header-with-button button {
    width: 15%;
    font-size: 20px;
}

.header-with-button.table h1 {
    margin-left: 10%;
}

.header-with-button.table button {
    margin-right: 30px;
    float: right;
}

.header-with-button.form.one-button h1 {
    margin-right: 22%;
}

.header-with-button.form.one-button button {
    margin-left: 10%;
    float: left;
}

.header-with-button.form button.left {
    margin-left: 10%;
    float: left;
}

.header-with-button.form button.right {
    margin-right: 10%;
    float: right;
}
</style>