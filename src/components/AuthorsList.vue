<template>
  <div class="authors-list">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Pen Name</th>
          <th>Name</th>
          <th>Surname</th>
          <th v-if="isAdmin" class="th-adjust">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authorsSource" :key="author.id">
          <td>{{ author.id }}</td>
          <td>{{ author.penName }}</td>
          <td>{{ author.name }}</td>
          <td>{{ author.surname }}</td>
          <td v-if="isAdmin" class="td-adjust">
            <button @click="handleClick(author)" class="primary-button">Edit data</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'authors-list',
  props: {
    authorsSource: Array,
    isAdmin: Boolean,
  },
  methods: {
    handleClick(author) {
      this.$emit('clicked:button', author)
    }
  },
}
</script>

<style>
/* Style the same as in BooksList.vue */
</style>