<template>
  <div class="text-left">
    <h2>Create Outlet</h2>
    <div class="card bg-white w-100 p-3">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Nama Outlet</label>
          <input
            required
            v-model="outlet_name"
            type="text"
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
      outlet_name: "",
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
      this.axios.get("/outlet/" + id).then((response) => {
        this.outlet_name = response.data.data.outlet.nama_outlet;
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
          .post("/outlet", { nama_outlet: this.outlet_name })
          .then(() => {
            this.$router.push("/outlet");
          }).catch(()=>{
            this.disabled(false);
          });
      } else {
        this.axios
          .put("/outlet/" + this.$route.query.id, {
            nama_outlet: this.outlet_name,
          })
          .then(() => {
            this.$router.push("/outlet");
          });
      }
    },
  },
};
</script>
