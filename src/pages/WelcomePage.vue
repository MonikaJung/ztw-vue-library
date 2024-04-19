<template>
    <div class="welcome-page">
      <h1>Welcome to the Library</h1>
      <p>Choose your user account in the top right corner and explore!</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WelcomePage',
  };
  </script>
  
  <style scoped>
  .welcome-page {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    color: #ffffff;
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  p {
    color: #f8f9fa;
    font-size: 18px;
    margin-bottom: 30px;
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
  