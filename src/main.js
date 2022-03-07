import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import Default from "./layouts/Default.vue";
import NoSidebar from "./layouts/NoSidebar.vue";
Vue.config.productionTip = false;
Vue.component("default-layout", Default);
Vue.component("no-sidebar", NoSidebar);
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://localhost:8000/api";
new Vue({
  router,
  store,
  methods: {
    isAuthenticate: function () {
      if (this.$store.getters.isLoggedIn) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$store.state.token;
        this.axios
          .get("/login/check")
          .then((response) => {
            if (response.data.success == false) {
              this.$store.dispatch("logout");
            } else {
              this.$store.commit("userDetail", response.data.data);
            }
          })
          .catch((error) => {
            this.$store.dispatch("logout");
          });
      } else {
        this.$store.dispatch("logout");
      }
    },
  },
  mounted() {
    this.isAuthenticate();
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  },
  render: (h) => h(App),
}).$mount("#app");
