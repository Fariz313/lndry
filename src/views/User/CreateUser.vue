<template>
  <div class="text-left">
    <h2>Create User</h2>
    <div class="card bg-white w-100 p-3">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label>Nama</label>
          <input
            required
            v-model="user.name"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Username</label>
          <input
            required
            v-model="user.username"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Outlet</label>
          <select required v-model="user.id_outlet" class="form-control">
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
          <label>Role</label>
          <select required v-model="user.role" class="form-control">
            <option value="admin" >Admin</option>
            <option value="kasir" >Kasir</option>
            <option value="owner" >Owner</option>
          </select>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            :required="requirePassword"
            v-model="user.password"
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
      user: {
        name: "",
        username: "",
        password: "",
        id_outlet: "",
        role:""
      },
      outlet: [],
      requirePassword: true,
    };
  },
  mounted() {
    this.disabled(true);
    this.fetchSelect();
    if (this.$route.query.id) {
      this.fetch(this.$route.query.id);
    } else {
      this.disabled(false);
    }
  },
  methods: {
    fetchSelect() {
      this.axios.get("/outlet").then((response) => {
        this.outlet = response.data.data.outlet;
        console.log(this.outlet);
      });
    },
    fetch(id) {
      this.disabled(true);
      this.axios.get("/user/" + id).then((response) => {
        this.user.name = response.data.data.user.name;
        this.user.username = response.data.data.user.username;
        this.user.id_outlet = response.data.data.user.id_outlet;
        this.user.role = response.data.data.user.role;
        this.disabled(false);
        this.requirePassword = false;
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
    submit() {
      this.disabled(true);
      if (!this.$route.query.id) {
        this.axios
          .post("/register", this.user)
          .then(() => {
            this.$router.push("/user");
          })
          .catch(() => {
            this.disabled(false);
          });
      } else {
        this.axios.put("/user/" + this.$route.query.id, this.user).then(() => {
          this.$router.push("/user");
        });
      }
    },
  },
};
</script>
