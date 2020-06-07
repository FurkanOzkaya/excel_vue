<template>
  <div id="app">
    <div class="header">
      <h1 >Excel App</h1>
      <div class="column">
      <input v-model="column_name"  class="column_input" type="text" placeholder="Enter Colmn Name">
      <button class="column_button" v-on:click="add_column()" >Add Column</button>
      </div>
    </div>
    <Excel/>
       
  </div>
</template>

<script>
import Excel from './components/Excel.vue'


export default {
  name: 'App',
  data() {
    return {
      column_name: "",
    }
  },
  components: {
    Excel
  },
  methods: {
    add_column: function(){
      console.log("colmn name ", this.column_name)
      if (this.column_name != "")
      {
          this.$http.post('http://127.0.0.1:9000/api/post-column/', {name: this.column_name}).then( () =>
          {
            alert("Successfully added refeshing page")
            location.reload();
          }
          ,
          response => {
            console.log(response.status)
          })
      }
      else {
        alert("Column name has to be given")
      }  
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.column {
  display: flex;
  align-items: center;
  float: right;
  border:red;
  margin-left:auto; 
  margin-right:0;
}
.column_button {
  border: none;
  margin-left: 10px;
  box-shadow: 0px 2px 4px rgba(29, 129, 82, 0.589);
  color: white;
  height: 75px;
  width: 75px;
  font-size: 16px;
  background-color: #50d890;
  transition: 0.3s ease;
  border-radius: 50%;
}

.column_button:hover {
  background-color: red;
  transition: 0.3s ease;
}

.column_input {
  float: right;
  font-size: 16px;
  margin-left:auto;
  margin-right:0px;
}
h1 {
  margin-left: 20%;
  margin-right: auto;
}
.header {
  display: flex;
  align-items: center;
  float: center;
  width: 100%;
  font-size: 30px;
}
</style>
