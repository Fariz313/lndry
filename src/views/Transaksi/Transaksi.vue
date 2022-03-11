<template>
  <div class="text-left">
    <h2>Transaksi</h2>
    <div class="card bg-white w-100 p-3">
      <table id="transaksi" class="display" style="width: 100%">
        <thead>
          <tr>
            <th>ID Transaksi</th>
            <th>Tanggal</th>
            <th>Member</th>
            <th>User</th>
            <th>Batas Waktu</th>
            <th>Status</th>
            <th>Pembayaran</th>
            <th>Tanggal Bayar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in transaksi" :key="index">
            <td>{{ item.id_transaksi }}</td>
            <td>{{ item.tgl }}</td>
            <td>{{ item.member.nama }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.batas_waktu }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.dibayar }}</td>
            <td>{{ item.tgl_bayar }}</td>
            <td>
              <router-link :to="'/transaksi/create?id='+item.id_transaksi" class="btn mx-2 btn-warning">Edit</router-link>
              <button @click="deleteData(item.id_transaksi)" class="btn mx-2 btn-danger">Delete</button>
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
      transaksi: [],
    };
  },
  methods: {
    fetch() {
      this.disabled(true)
      this.axios.get("/transaksi").then((response) => {
        this.transaksi = response.data.data.transaksi;
        $(document).ready(function () {
          $("#transaksi").DataTable();
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
      this.axios.delete("/transaksi/"+id).then((response) => {
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
