<template>
  <div class="tabs-bar">
    <div class="tabs-container">
      <button class="icon-button" @click="goToHomePage()"><img class="icon logo-icon" :src="logoSrc"
          alt="Logo"></button>
      <div v-for="tabObj in tabs" :key="tabObj.id">
        <button :class="{ 'tab-button': true, 'chosen-tab': tabObj.id === chosenTab }" :id="'tab-' + tabObj.id"
          @click="changeTab(tabObj.id)">{{ tabObj.name }}</button>
      </div>
    </div>
    <div class="client-container">
      <img class="icon client-icon" :src="userImgSrc" alt="Client">
      <div class="client-combobox">
        <select @change="changeClient($event.target.value)" class="combobox">
          <option key="0" value="0">admin</option>
          <option v-for="client in clientsSource" :key="client.id" :value="client.id">{{ client.name + ' ' +
            client.surname
            }}</option>
        </select>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import logo from "../assets/books_icon.png";
import user_img from "../assets/user_icon.png";
import { useRouter } from 'vue-router';

export default {
  name: 'tabs-bar',
  props: {
    tabsSource: Array,
    clientsSource: Array,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const chosenTab = ref(1);
    const chosenClient = ref(0);

    const logoSrc = logo;
    const userImgSrc = user_img;

    const tabs = [
      { id: 1, name: "Library", path: '/library' },
      { id: 2, name: "Authors", path: '/authors' },
      { id: 3, name: "My books", path: '/my-books' },
    ];

    const changeTab = (tabId) => {
      chosenTab.value = tabId;
      router.push(tabs.find(tab => tab.id === tabId).path);
    };

    const changeClient = (clientId) => {
      chosenClient.value = clientId;
      emit('change:client', chosenClient);
    };

    const goToHomePage = () => {
      chosenTab.value = 0;
      router.push('/');
    }

    return {
      chosenTab,
      chosenClient,
      logoSrc,
      userImgSrc,
      tabs,
      changeTab,
      changeClient,
      goToHomePage,
    };
  },
};
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
  border-radius: 20px;
}

.tabs-container button.tab-button {
  padding: 14px 16px;
  transition: background-color 0.3s;
  font-size: 17px;
  color: #ffffff;
}

.tabs-container button.tab-button.active {
  background-color: #007bff;
}

.tabs-container button.tab-button:hover {
  background-color: #0056b3;
}

button.tab-button.chosen-tab {
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