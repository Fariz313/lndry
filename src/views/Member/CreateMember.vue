<template>
  <div class="text-left">
    <h2>Create Member</h2>
    <div class="card bg-white w-100 p-3">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Nama Member</label>
          <input
            required
            v-model="member.nama"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Alamat Member</label>
          <input
            required
            v-model="member.alamat"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Jenis Kelamin Member</label>
          <select
            required
            v-model="member.jenis_kelamin"
            type="text"
            class="form-control"
          >
            <option value="l">Laki laki</option>
            <option value="p">Perempuan</option>
          </select>
        </div>
        <div class="form-group">
          <label>Telepon Member</label>
          <input
            required
            v-model="member.tlp"
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
      member: {
        nama:'',
        alamat:'',
        jenis_kelamin:'',
        tlp:''
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
      this.axios.get("/member/" + id).then((response) => {
        this.member.nama = response.data.data.member.nama;
        this.member.alamat = response.data.data.member.alamat;
        this.member.jenis_kelamin = response.data.data.member.jenis_kelamin;
        this.member.tlp = response.data.data.member.tlp;
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
          .post("/member", this.member)
          .then(() => {
            this.$router.push("/member");
          }).catch(()=>{
            this.disabled(false);
          });
      } else {
        this.axios
          .put("/member/" + this.$route.query.id, this.member)
          .then(() => {
            this.$router.push("/member");
          });
      }
    },
  },
};
</script>
