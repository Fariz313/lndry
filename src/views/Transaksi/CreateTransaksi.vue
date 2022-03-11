<template>
  <div class="text-left">
    <h2>Create Transaksi</h2>
    <div class="card bg-white w-100 p-3">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Tanggal</label>
          <input
            required
            v-model="transaksi.tgl"
            type="date"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Member</label>
          <select
            required
            v-model="transaksi.id_member"
            class="form-control"
          >
            <option
              v-for="(item, index) in member"
              :key="index"
              :value="item.id_member"
            >
              {{ item.nama }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Tanggal Bayar</label>
          <input
            v-model="transaksi.tgl_bayar"
            class="form-control"
            type="date"
          />
        </div>
        <div class="form-group">
          <label>Batas Waktu</label>
          <input
            v-model="transaksi.batas_waktu"
            class="form-control"
            type="date"
          />
        </div>
        <div class="form-group">
          <label>Status</label>
          <select
            required
            v-model="transaksi.status"
            class="form-control"
          >
            <option value="baru">Baru</option>
            <option value="proses">Proses</option>
            <option value="selesai">Selesai</option>
            <option value="diambil">Diambil</option>
          </select>
        </div>
        <div class="form-group">
          <label>Dibayar</label>
          <select
            required
            v-model="transaksi.dibayar"
            class="form-control"
          >
            <option value="dibayar">Dibayar</option>
            <option value="belum_dibayar">Belum Dibayar</option>
          </select>
        </div>
        <div class="form-group">
          <label>Paket</label>
          <select
            required
            v-model="transaksi.id_paket"
            class="form-control"
          >
            <option
              v-for="(item, index) in paket"
              :key="index"
              :value="item.id_paket"
            >
              {{ item.jenis }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Berat</label>
          <input
            required
            v-model="transaksi.berat"
            type="number"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">Simpan</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transaksi: {
        id_member:'',
        tgl:'',
        tgl_bayar:'',
        batas_waktu:'',
        id_paket:'',
        status:'',
        dibayar:'',
        berat:'',
      },
      paket:{},
      member:{},
      outlet:{},
    };
  },
  mounted() {
    this.disabled(true);
    this.fetchSelect();
    if (this.$route.query.id) {
      this.fetch(this.$route.query.id);
    }else{
      this.disabled(false);
    }
  },
  methods: {
    fetch(id) {
      this.disabled(true);
      this.axios.get("/transaksi/" + id).then((response) => {
        this.transaksi.id_member = response.data.data.transaksi.id_member;
        this.transaksi.tgl = response.data.data.transaksi.tgl;
        this.transaksi.tgl_bayar = response.data.data.transaksi.tgl_bayar;
        this.transaksi.batas_waktu = response.data.data.transaksi.batas_waktu;
        this.transaksi.id_paket = response.data.data.transaksi.id_paket;
        this.transaksi.berat = response.data.data.transaksi.berat;
        this.transaksi.status = response.data.data.transaksi.status;
        this.transaksi.dibayar = response.data.data.transaksi.dibayar;
        this.disabled(false);
      });
    },
    fetchSelect() {
      this.axios.get("/outlet").then((response) => {
        this.outlet = response.data.data.outlet;
        console.log(this.outlet);
      });
      this.axios.get("/member").then((response) => {
        this.member = response.data.data.member;
        console.log(this.member);
      });
      this.axios.get("/paket").then((response) => {
        this.paket = response.data.data.paket;
        console.log(this.paket);
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
    submit() {
      this.disabled(true);
      if (!this.$route.query.id) {
        this.axios
          .post("/transaksi", this.transaksi)
          .then(() => {
            this.$router.push("/transaksi");
          }).catch(()=>{
            this.disabled(false);
          });
      } else {
        this.axios
          .put("/transaksi/" + this.$route.query.id, this.transaksi)
          .then(() => {
            this.$router.push("/transaksi");
          });
      }
    },
  },
};
</script>
