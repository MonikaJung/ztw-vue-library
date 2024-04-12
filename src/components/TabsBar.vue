<template>
  <div class="tabs-bar">
    <img class="icon logo-icon" :src="logo" alt="Logo">
    <div v-for="tabObj in tabsSource" :key="tabObj.id">
      <button :class="{ 'tablinks': true, 'chosen-tab': tabObj.id === choosenTab }" :id="tabObj.id"
        @click="openTab(tabObj.id)">{{ tabObj.name }}</button>
    </div>
    <img class="icon user-icon" :src="user_img" alt="User">
    <div class="client-combobox">
      <select class="combobox">
        <option v-for="client in tabsSource" :key="client.id" :value="client.id">{{ client.name + ' ' + client.surname
          }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import logo from "../assets/books_icon.png";
import user_img from "../assets/user_icon.png";

export default ({
  name: 'tabs-bar',
  props: {
    tabsSource: Array,
  },
  data() {
    return {
      choosenTab: '',
      logo: logo,
      user_img: user_img
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

.icon.logo-icon {
  margin-right: 10px;
  height: 50px;
}

.icon.user-icon {
  height: 40px;
  padding-top: 0px;
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
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.client-container {
  margin-left: 20px;
}

.combobox {
  margin-left: 10px;
  float: right;
  padding: 10px 6px;
  font-size: 16px;
  border: 1px solid #495057;
  border-radius: 5px;
  background-color: #343a40;
  color: #ffffff;
  cursor: pointer;
}

.combobox:focus {
  border-color: #0056b3; /* Darker blue border color on focus */
}

.combobox option:checked {
  background-color: #007bff; /* Blue background color for selected option */
}

.combobox option {
  background-color: #343a40;
  color: #ffffff;
}
</style>