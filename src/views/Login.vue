<template>
  <div class="container vh-100" style="position: relative">
    <div class="card border-0 shadow absolute-center p-5">
      <h3 class="py-5">Selamat Datang</h3>
      <div
        class="alert alert-dismissible fade show"
        v-if="showAlert"
        role="alert"
        :class="alertType"
      >
        {{ alertMesage }}
        <button
          type="button"
          class="btn-danger text-white close"
          v-on:click="showAlert = !showAlert"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit.prevent="submit" class="user">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            class="form-control form-control-user"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            placeholder="Enter Username..."
          />
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
        <button :disabled="loading" type="submit" class="btn btn-primary btn-user btn-block">
          Login
        </button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  transform: translate(-50%, -50%);
}
</style>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      loading:false,
      isAlertSuccess: false,
      alertStatus: "",
      alertMesage: "",
      showAlert: false,
    };
  },
  computed: {
    alertType() {
      return {
        "alert-success": this.isAlertSuccess,
        "alert-danger": !this.isAlertSuccess,
      };
    },
  },
  methods: {
    submit() {
      this.loading=true;
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then((response) => {
          console.log(response);
          this.alertMesage = "Login Berhasil";
          this.isAlertSuccess = true;
          this.showAlert = true;
          this.$router.push("/");
          
        })
        .catch((err) => {
          this.alertMesage = "Username / Password Salah";
          this.isAlertSuccess = false;
          this.showAlert = true;
      this.loading=false;

        });
    },
  },
  mounted() {
    // console.log(this.$store.state.token);
  },
};
</script>
