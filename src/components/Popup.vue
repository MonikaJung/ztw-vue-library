<template>
    <div v-if="show" :class="['popup', messageType]">
      <span>{{ message }}</span>
      <button @click="closePopup">x</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PopupMessage',
    props: {
      message: String,
      type: {
        type: String,
        default: 'info',
        validator: function(value) {
          return ['success', 'info', 'error'].indexOf(value) !== -1;
        },
      },
    },
    data() {
      return {
        show: true,
      };
    },
    computed: {
      messageType() {
        return this.type === 'success'
          ? 'success'
          : this.type === 'error'
            ? 'error'
            : 'info';
      },
    },
    methods: {
      closePopup() {
        this.show = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  }
  
  .popup span {
    margin-right: 15px;
    font-size: 18px;
  }
  
  .popup button {
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    top: 5px;
    right: 10px;
  }
  
  .success {
    background-color: #1c7330; /* Green */
  }
  
  .info {
    background-color: #ad8201; /* Yellow */
  }
  
  .error {
    background-color: #92242f; /* Red */
  }
  </style>
  