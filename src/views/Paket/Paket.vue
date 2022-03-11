<template>
  <div class="text-left">
    <h2>Paket</h2>
    <div class="card bg-white w-100 p-3">
      <table id="paket" class="display" style="width: 100%">
        <thead>
          <tr>
            <th>Jenis</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paket" :key="index">
            <td>{{ item.jenis }}</td>
            <td>{{ item.harga }}</td>
            <td>
              <router-link :to="'/paket/create?id='+item.id_paket" class="btn mx-2 btn-warning">Edit</router-link>
              <button @click="deleteData(item.id_paket)" class="btn mx-2 btn-danger">Delete</button>
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
      paket: [],
    };
  },
  methods: {
    fetch() {
      this.disabled(true)
      this.axios.get("/paket").then((response) => {
        this.paket = response.data.data.paket;
        $(document).ready(function () {
          $("#paket").DataTable();
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
      this.axios.delete("/paket/"+id).then((response) => {
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
