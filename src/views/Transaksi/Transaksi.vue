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
            <td>
              <select @change="update($event,item.id_transaksi,'status')" :disabled="loading" class="form-control" id="">
                <option :selected="item.status == 'baru'" value="baru">
                  baru
                </option>
                <option :selected="item.status == 'proses'" value="proses">
                  proses
                </option>
                <option :selected="item.status == 'selesai'" value="selesai">
                  selesai
                </option>
                <option :selected="item.status == 'diambil'" value="diambil">
                  diambil
                </option>
              </select>
            </td>
            <td>
              <select @change="update($event,item.id_transaksi,'dibayar')" :disabled="loading" class="form-control">
                <option :selected="item.dibayar == 'dibayar'" value="dibayar">
                  dibayar
                </option>
                <option :selected="item.dibayar == 'belum_dibayar'" value="belum_dibayar">
                  belum dibayar
                </option>
              </select>
            </td>
            <td>{{ item.tgl_bayar }}</td>
            <td>
              <router-link
                :to="'/transaksi/create?id=' + item.id_transaksi"
                class="btn mx-2 btn-warning"
                >Edit</router-link
              >
              <button
                @click="deleteData(item.id_transaksi)"
                class="btn mx-2 btn-danger"
              >
                Delete
              </button>
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
      loading: false
    };
  },
  methods: {
    fetch() {
      this.disabled(true);
      this.axios.get("/transaksi").then((response) => {
        this.transaksi = response.data.data.transaksi;
        $(document).ready(function () {
          $("#transaksi").DataTable();
        });
        this.disabled(false);
      });
    },
    update(event,id,type){
      this.loading = true
      let data  = {}
      if(type=='status'){
        data.status = event.target.value
      }if(type=='dibayar'){
        data.dibayar = event.target.value
      }
      this.axios
          .put("/transaksi/" + id, data)
          .then(() => {
            this.loading = false
          });
    },
    disabled(disabled = true) {
      if (disabled) {
        $(document).ready(() => {
          $(":input").prop("disabled", true);
          $(":button").prop("disabled", true);
        });
      } else {
        $(document).ready(() => {
          $(":input").prop("disabled", false);
          $(":button").prop("disabled", false);
        });
      }
    },
    deleteData(id) {
      this.disabled(true);
      this.axios
        .delete("/transaksi/" + id)
        .then((response) => {
          this.fetch();
        })
        .catch(() => {
          this.disabled(false);
        });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
