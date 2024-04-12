<template>
  <div class="tabs-bar">
    <div class="tabs-container">
      <img class="icon logo-icon" :src="logo" alt="Logo">
      <div v-for="tabObj in tabsSource" :key="tabObj.id">
        <button :class="{ 'tablinks': true, 'chosen-tab': tabObj.id === choosenTab }" :id="tabObj.id"
          @click="openTab(tabObj.id)">{{ tabObj.name }}</button>
      </div>
    </div>
    <div class="client-container">
      <img class="icon client-icon" :src="user_img" alt="Client">
      <div class="client-combobox">
        <select class="combobox">
          <option v-for="client in clientsSource" :key="client.id" :value="client.id">{{ client.name + ' ' + client.surname
            }}</option>
        </select>
      </div>
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
    clientsSource: Array,
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

<style scoped>
.tabs-bar {
  align-items: center;
  display: flex;
}

.tabs-container {
  overflow: hidden;
  border: 1px solid #004085;
  background-color: #212529;
  flex: 1;
  display: flex;
  padding: 8px;
  width: 70%;
}

.icon.logo-icon {
  margin-right: 10px;
  height: 50px;
}

.tabs-container button {
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

.tabs-container button:hover {
  background-color: #0056b3;
}

.tabs-container button.active {
  background-color: #007bff;
}

button.tablinks.chosen-tab {
  background-color: #007bff;
  color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.client-container {
  margin: 0 20px;
  display: flex;
  background: #495057;
  padding: 12px;
  border-radius: 10px;
}
.icon.client-icon {
  height: 40px;
  padding-top: 0px;
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
  border-color: #0056b3;
}

.combobox option:checked {
  background-color: #007bff;
}

.combobox option {
  background-color: #343a40;
  color: #ffffff;
}
</style>