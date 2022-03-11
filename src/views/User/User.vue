<template>
  <div class="text-left">
    <h2>User</h2>
    <div class="card bg-white w-100 p-3">
      <table id="user" class="display" style="width: 100%">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Username</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in user" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.role }}</td>
            <td>
              <router-link :to="'/user/create?id='+item.id_user" class="btn mx-2 btn-warning">Edit</router-link>
              <button @click="deleteData(item.id_user)" class="btn mx-2 btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: [],
    };
  },
  methods: {
    fetch() {
      this.disabled(true)
      this.axios.get("/user").then((response) => {
        this.user = response.data.data.user;
        $(document).ready(function () {
          $("#user").DataTable();
        });
        this.disabled(false)
      });
    },
    fetchOutlet() {
      this.axios.get("/outlet").then((response) => {
        this.outlet = response.data.data.outlet;
        console.log(this.outlet);
      });
    },
    disabled(disabled=true) {
      if(disabled){
        $(document).ready(() => {
          $(":input").prop("disabled", true);
          $(":button").prop("disabled", true);
        });
      }else{
        $(document).ready(() => {
          $(":input").prop("disabled", false);
          $(":button").prop("disabled", false);
        });
      }
    },
    deleteData(id){
      this.disabled(true)
      this.axios.delete("/user/"+id).then((response) => {
        this.fetch()
      }).catch(()=>{
        this.disabled(false)
      });
    }
  },
  mounted() {
    this.fetch();
    this.fetchOutlet();
  },
};
</script>
