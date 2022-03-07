<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form @submit.prevent="submit" class="user">
                <div class="form-group">
                  <input
                    v-model="name"
                    type="text"
                    class="form-control form-control-user"
                    id="exampleFirstName"
                    placeholder="Name"
                  />
                </div>
                <div class="form-group">
                  <input
                    v-model="username"
                    type="text"
                    class="form-control form-control-user"
                    id="exampleInputEmail"
                    placeholder="Username"
                  />
                </div>
                <div class="form-group">
                  <select v-model="id_outlet" class="form-control rounded-pill">
                    <option value="" disabled>Pilih Outlet</option>
                    <option
                      v-for="(item, index) in outlet"
                      :key="index"
                      :value="item.id_outlet"
                    >
                      {{ item.nama_outlet }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <input
                  v-model="password"
                    type="password"
                    class="form-control form-control-user"
                    id="exampleInputPassword"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-user btn-block"
                >
                  Register Account
                </button>
              </form>
              <div class="text-center">
                <router-link class="small" to="/login"
                  >Already have an account? Login!</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      outlet_id: "",
      alert: false,
      alertType: "",
      birth_date: "",
      rawPhone: "",
      id_outlet: "",
      disabledSubmit: false,
      outlet: [],
    };
  },
  methods: {
    fetch() {
      this.axios.get("/outlet").then((response) => {
        this.outlet = response.data.data.outlet;
        console.log(this.outlet);
      });
    },
    submit() {
      this.disabledSubmit = true;
      const dataForm = {
          name : this.name,
          username : this.username,
          password : this.password,
          id_outlet : this.id_outlet
      } 
      this.$store
        .dispatch("register", dataForm )
        .then((response) => {
            console.log(response);
          this.alert = true;
          this.alertType = "alert-success";
          this.alertText = "Register Berhasil";
        })
        .catch((err) => {
          this.disabledSubmit = false;
          if (err.response.status == 400) {
            this.alert = true;
            this.alertType = "alert-danger";
            let vald = err.response.data;
            this.alertText = vald[0];
            this.disabledSubmit = false;
          } else {
            this.alert = true;
            this.alertType = "alert-danger";
            this.alertText = "Register Gagal";
            this.disabledSubmit = false;
          }
        });
    },
    onUpdate(payload) {
      this.rawPhone = payload;
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
