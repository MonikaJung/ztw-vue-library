<template>
    <div class="books-list">
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th class="th-adjust">{{buttonHeader}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in booksSource" :key="book.id">
                    <td>{{ book.id }}</td>
                    <td>"{{ book.title }}"</td>
                    <td>{{ book.author.penName }}</td>
                    <td>{{ book.pages }}</td>
                    <td class="td-adjust">
                        <button v-if="book.available" @click="handleClick(book)" class="primary-button">{{buttonText}}</button>
                        <button v-else class="primary-button" disabled>Unavailable</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default ({
    name: 'books-list',
    props: {
        booksSource: Array,
        buttonText: Text,
        buttonHeader: Text
    },
    methods: {
      handleClick(book) {
        this.$emit('clicked:button', book)
      }
    }
})
</script>


<style scoped>
table {
  width: 96%;
  margin-left: 2%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #212529;
  border-radius: 8px;
  overflow: hidden;
}

th {
  background-color: #0056b3;
  color: #ffffff;
  padding: 12px;
  font-size: 20px;
  text-align: left;
}

tr {
  border-bottom: 1px solid #004085;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #2c3036;
}

td {
  padding: 12px;
  color: #f8f9fa;
}

tr:hover {
  background-color: #003366;
}

.td-adjust {
  width: 10%;
}

.th-adjust {
 text-align: center;
}

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

</style>