<template>
    <Popup v-if="popup.visable" :message="popup.message" :type="popup.type" @close="closePopup" />

    <div name="author-list-container" v-if="!state.isAction">
        <div class="header-with-button table">
            <h1>Authors</h1>
            <button class="primary-button" @click="showAddForm">Add Author</button>
        </div>
        <AuthorsList :authorsSource="authors" :isAdmin="true" buttonText="Edit author" columnHeader="Edit"
            @clicked:button="showEditForm" />
    </div>

    <div name="add-author-container" v-if="state.isAction && state.isAdding">
        <div class="header-with-button form one-button">
            <button class="primary-button" @click="hideForm">Cancel</button>
            <h1>Add a new author</h1>
        </div>
        <AuthorForm submitText="Add author" @submit:form="addAuthor" authorData='' />
    </div>

    <div name="edit-author-container" v-if="state.isAction && state.isEditing">
        <div class="header-with-button form two-buttons">
            <button class="primary-button left" @click="hideForm">Cancel</button>
            <h1>Edit author</h1>
            <button class="primary-button delete right" @click="deleteAuthor">Delete author</button>
        </div>
        <AuthorForm submitText="Save changes" @submit:form="editAuthor" :authorData="authorToEdit" />
    </div>
</template>

<script>
import AuthorsList from '../components/AuthorsList.vue'
import AuthorForm from '../components/AuthorForm.vue'
import Popup from '../components/Popup.vue'

export default {
    name: 'authors-page-admin',
    components: {
        AuthorsList,
        AuthorForm,
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
            authors: [
                {
                    id: 1,
                    name: 'author1',
                    surname: '124',
                    penName: 'author1 1234'
                },
            ],
            authorToEdit: ''
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
        async addAuthor(author) {
            try {
                const response = await fetch('http://localhost:8080/author', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(author)
                })
                const data = await response.json()
                if (!response.ok) this.showErrorPopup(data.message + ' (' + data.error + ')')
                else this.showSuccessPopup('New author "' + author.title + '" by ' + author.author.penName + ' was added to the library.')
                this.hideForm()
            } catch (error) {
                console.error(error)
            }
        },
        async editAuthor(author) {
            try {
                const response = await fetch(`http://localhost:8080/author/${author.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(author)
                })
                const data = await response.json()
                if (!response.ok)
                    this.showErrorPopup(data.message + ' (' + data.error + ')')
                else
                    this.showSuccessPopup('Author "' + author.penName + ' was updated.')
                this.hideForm()
            } catch (error) {
                console.error(error)
            }
        },
        async deleteAuthor() {
            try {
                const response = await fetch(`http://localhost:8080/author/${this.authorToEdit.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.authorToEdit)
                })
                const data = await response.json()
                if (!response.ok)
                    this.showErrorPopup(data.message + ' (' + data.error + ')')
                else
                    this.showSuccessPopup('Author "' + this.authorToEdit.penName + ' was deleted.')
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
        },
        showAddForm() {
            this.clearState(true)
            this.state.isAdding = true
        },
        showEditForm(author) {
            this.clearState(true)
            this.state.isEditing = true
            this.authorToEdit = author
        },
        hideForm() {
            this.clearState(false)
            this.authorToEdit = ''
            this.getAuthors()
        },
    },
    mounted() {
        this.getAuthors()
    },
}
</script>

<style>
/* Style the same as in authorsPageAdmin.vue */
</style>