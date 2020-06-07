<template>
  <div>
    <button class="btn-action" style="float: right; margin-bottom:25px;" v-on:click="add_row()" v-if="!display_add && !display_update">Add Row</button>
    <div v-if="!display_all && display_update">
        <h2>Update Element</h2>
       <div class="json_editor">
           <JsonEditor
              :options="{
                  confirmText: 'confirm',
                  cancelText: 'cancel',
              }"
              :objData="update_datas" 
              v-model="update_datas" >
          </JsonEditor>
       <button class="btn-action" style="width:200px; margin: 0 10px;" v-on:click="discard_changes()"> Discard change and Turn Back to Main Page</button>
       <button class="btn-action" v-on:click="save_changes()">Save Changes</button>
       </div>
    </div>
   <table v-show="display_all">
      <tr>
        <th>Update</th>
        <th>Delete</th>
        <th v-for="column in columns" :key="column.name">{{column.name}}</th>
      </tr>
      <tr  v-for="(data, id) in datas" :key="id">
        <td><button class="btn btn-update" v-on:click="update_item(data.id, data.content)" >Update</button></td>
        <td><button class="btn btn-delete" v-on:click="delete_item(data.id)">Delete</button></td>
        <td v-for="content in data.content" :key="content">{{content}}</td>
      </tr>
   </table>
   <div class="json_editor" v-if="display_add">
     <h2>Add Element</h2>
     <JsonEditor 
              :options="{
                  confirmText: 'confirm',
                  cancelText: 'cancel',
              }"
              :objData="add_data" 
              v-model="add_data" >
          </JsonEditor>
    <button class="btn-action" style="margin: 0 10px;" v-on:click="() => {display_add = false; display_all = true}">Cancel</button>
    <button class="btn-action" v-on:click="add_new_row()">Save Changes</button>
   </div>
   
  </div>
</template>

<script>

export default {
  name: 'Excel',
  data() {
    return {
        columns: null,
        datas: null,
        update_datas: null,
        id: null,
        display_all: true,
        display_add: false,
        display_update: false,
        add_data:"",
    } 
  },
  methods: {
    get_datas: function(){
      this.$http.get('http://127.0.0.1:9000/api/get-data/').then(response => {
        this.columns = response.data["column"];
        this.datas = response.data["data"];
        console.log(response.data)
      },
      response => {
        console.log(response)
      })
    },
    update_item: function(id, data) {
      this.update_datas = data
      this.id = id
      this.display_all = false
      this.display_update= true
      console.log(id, data)
      console.log(this.update_datas)      
    },
    save_changes: function() {
      this.$http.put('http://127.0.0.1:9000/api/update-data/'+this.id, {"content": this.update_datas}).then(response => {
        console.log(response)
        alert("Successfully Updated")
        location.reload()
      },
      response => {
        console.log(response)
      })
      
    },
    delete_item: function(id) {
      this.$http.delete('http://127.0.0.1:9000/api/delete-data/'+id).then(response => {
        console.log(response)
        alert("Successfully Deleted Refeshing page!")
        location.reload()
      },
      response => {
        console.log(response)
      })
    },
    discard_changes: function(){
      this.update_datas = null
      this.id = null
      this.display_all = true
      this.display_update = false
    },
    add_row: function() {
      this.display_all = false
      var column;
      var json_obj = {};
      for( column of this.columns)
      {
        json_obj[column.name] = "empty"
      }
      console.log(json_obj)
      this.add_data = json_obj
      console.log(this.add_data)
      this.display_add = true
    },
    add_new_row: function() {
      this.$http.post('http://127.0.0.1:9000/api/post-data/', {"content": this.add_data}).then(response => {
        console.log(response)
        alert("Successfully Added Refeshing page!")
        location.reload()

      },
      response => {
        console.log(response)
      })
    },
  },
  created() {
    this.get_datas()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}


td, th {
  border: 1px solid #dddddd;
  text-align: left;
  text-align: center;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.btn {
  border-radius: 5%;
  display: block;
  width: 100%;
  height: 100%;
  color: white;
  border: none;
}

.btn-update {

  box-shadow: none;
  background-color: #0779e4;
  padding: 10px 0;
}

.btn-delete {
  box-shadow: none;
  background-color: #e84a5f;
  padding: 10px 0;
}

.btn-action {
  background-color:slateblue;
  width: 100px;
  border: none;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.json_editor {
  width: 50%;
  margin: 0px auto;
  background-color: rgba(237, 240, 243, 0.603);
  padding: 10px 10px;
}
</style>
