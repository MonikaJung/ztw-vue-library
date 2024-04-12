<template>
  <div class="tabs-bar">
    <img class="logo-img" :src="logo" alt="Logo">
    <div v-for="tabObj in tabsSource" :key="tabObj.id">
      <button :class="{'tablinks': true, 'chosen-tab': tabObj.id === choosenTab }" :id="tabObj.id"
        @click="openTab(tabObj.id)">{{ tabObj.name }}</button>
    </div>
  </div>
</template>

<script>
import logo from "../assets/books_icon.png";

export default ({
  name: 'tabs-bar',
  props: {
    tabsSource: Array,
  },
  data() {
    return {
      choosenTab: '',
      logo: logo
    }
  },
  methods: {
    openTab(tabId) {
      this.choosenTab = tabId
      this.$emit('change:tab', this.choosenTab)
    }
  }
}) 
</script>

<style>
.tabs-bar {
  overflow: hidden;
  border: 1px solid #004085;
  background-color: #212529;
  display: flex;
  align-items: center;
  padding: 8px;
}

.logo-img {
  margin-right: 10px;
  height: 50px;
}

.tabs-bar button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: background-color 0.3s;
  font-size: 17px;
  color: #ffffff;
  border-radius: 20px;
}

.tabs-bar button:hover {
  background-color: #0056b3;
}

.tabs-bar button.active {
  background-color: #007bff;
}

button.tablinks.chosen-tab {
  background-color: #007bff;
  color: #ffffff;
}
</style>