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
              <select
                @change="update($event, item.id_transaksi, 'status')"
                :disabled="loading"
                class="form-control"
                id=""
              >
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
              <select
                @change="update($event, item.id_transaksi, 'dibayar')"
                :disabled="loading"
                class="form-control"
              >
                <option :selected="item.dibayar == 'dibayar'" value="dibayar">
                  dibayar
                </option>
                <option
                  :selected="item.dibayar == 'belum_dibayar'"
                  value="belum_dibayar"
                >
                  belum dibayar
                </option>
              </select>
            </td>
            <td>{{ item.tgl_bayar }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="showDetail(item)"
              >
                Launch demo modal
              </button>

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
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">INVOICE #{{transaksiDetail.id_transaksi}}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body" id="invoice">
            <h1>Aqila Laundry</h1>
            <table class="text-start w-100" border="0">
              <tr>
                <td>
                  ID Invoice
                </td>
                <td>
                  :
                </td>
                <td>
                  {{transaksiDetail.id_transaksi}}
                </td>
              </tr>
              <tr>
                <td>
                  Tanggal Transaksi
                </td>
                <td>
                  :
                </td>
                <td>
                  {{transaksiDetail.tgl}}
                </td>
              </tr>
              <tr>
                <td>
                  Nama Member
                </td>
                <td>
                  :
                </td>
                <td>
                  {{transaksiDetail.member.nama}}
                </td>
              </tr>
              <tr>
                <td>
                  Batas Waktu
                </td>
                <td>
                  :
                </td>
                <td>
                  {{transaksiDetail.batas_waktu}}
                </td>
              </tr>
              <tr>
                <td>
                  Tanggal Bayar
                </td>
                <td>
                  :
                </td>
                <td>
                  {{transaksiDetail.tgl_bayar}}
                </td>
              </tr>
              <tr>
                <td>
                  Status
                </td>
                <td>
                  :
                </td>
                <td>
                  {{transaksiDetail.status}}
                </td>
              </tr>
              <tr>
                <td>
                  Status Pembayaran
                </td>
                <td>
                  :
                </td>
                <td>
                  {{transaksiDetail.dibayar}}
                </td>
              </tr>
            </table>
            <table class="text-start w-100" border="0">
              <thead>
                <td>
                  Jenis Paket
                </td>
                <td>
                  Harga
                </td>
                <td>
                  Jumlah
                </td>
                <td>
                  Total Bayar
                </td>
              </thead>
              <tbody>
                <tr>
                  <td>{{transaksiDetail.paket.jenis}}</td>
                  <td>Rp.{{transaksiDetail.paket.harga}}</td>
                  <td>{{transaksiDetail.berat}} KG</td>
                  <td>Rp.{{transaksiDetail.berat * transaksiDetail.paket.harga}}</td>
                </tr>
              </tbody>
            </table>
            <p class="text-start">
              1. Pengambilan barang harus menyertakan nota<br/>
              2. Penyelesaian Pencucian Maks 3 Hari<br/>
              3. Barang yang tidak diambil 1 bulan jika hilang bukan tanggung jawab kami<br/>
              4. Apabila terjadi kehilangan atau cacat karena kesalahan kami, kami hanya bertanggung jawab 2x ongkos cuci <br/>
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger text-white"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" @click="print" class="btn btn-primary">Print</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import print from "print-js";
import printJS from 'print-js';

export default {
  data() {
    return {
      transaksi: [],
      loading: false,
      transaksiDetail:{
        member:{},
        paket:{}
      }
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
    update(event, id, type) {
      this.loading = true;
      let data = {};
      if (type == "status") {
        data.status = event.target.value;
      }
      if (type == "dibayar") {
        data.dibayar = event.target.value;
      }
      this.axios.put("/transaksi/" + id, data).then(() => {
        this.loading = false;
      });
    },
    showDetail(transaksi){
      this.transaksiDetail = transaksi;
      console.log(transaksi);
    },
    print(){
      printJS('invoice','html')
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
<style>
  td{
    padding-bottom: 15px;
  }
</style>