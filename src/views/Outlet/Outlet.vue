<template>
  <div class="text-left">
    <h2>Outlet</h2>
    <div class="card bg-white w-100 p-3">
      <table id="outlet" class="display" style="width: 100%">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in outlet" :key="index">
            <td>{{ item.nama_outlet }}</td>
            <td>
              <router-link :to="'/outlet/create?id='+item.id_outlet" class="btn mx-2 btn-warning">Edit</router-link>
              <button @click="deleteData(item.id_outlet)" class="btn mx-2 btn-danger">Delete</button>
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
      outlet: [],
    };
  },
  methods: {
    fetch() {
      this.disabled(true)
      this.axios.get("/outlet").then((response) => {
        this.outlet = response.data.data.outlet;
        $(document).ready(function () {
          $("#outlet").DataTable();
        });
        this.disabled(false)
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
      this.axios.delete("/outlet/"+id).then((response) => {
        this.fetch()
      }).catch(()=>{
        this.disabled(false)
      });
    }
  },
  mounted() {
    this.fetch();
  },
};
</script>
