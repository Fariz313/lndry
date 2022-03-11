<template>
  <div class="text-left">
    <h2>Create Paket</h2>
    <div class="card bg-white w-100 p-3">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Jenis Paket</label>
          <input
            required
            v-model="paket.jenis"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Harga Paket</label>
          <input
            required
            v-model="paket.harga"
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
      paket: {
        jenis:'',
        harga:''
      },
    };
  },
  mounted() {
    this.disabled(true);
    if (this.$route.query.id) {
      this.fetch(this.$route.query.id);
    }else{
      this.disabled(false);
    }
  },
  methods: {
    fetch(id) {
      this.disabled(true);
      this.axios.get("/paket/" + id).then((response) => {
        this.paket.harga = response.data.data.paket.harga;
        this.paket.jenis = response.data.data.paket.jenis;
        this.disabled(false);
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
          .post("/paket", this.paket)
          .then(() => {
            this.$router.push("/paket");
          }).catch(()=>{
            this.disabled(false);
          });
      } else {
        this.axios
          .put("/paket/" + this.$route.query.id, this.paket)
          .then(() => {
            this.$router.push("/paket");
          });
      }
    },
  },
};
</script>
