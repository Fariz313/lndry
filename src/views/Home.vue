<template>
  <div class="home vh-100">
    <h1>Selamat Datang Di Laundry Aqila</h1>
    <div class="row w-100 justify-content-between">
      <div class="col-md-3">
        <div class="card bg-primary text-white px-5 py-2 rounded">
          <h4>Transaksi</h4>
          <h1>{{ transaction }}</h1>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-primary text-white px-5 py-2 rounded">
          <h4>Member</h4>
          <h1>{{ member }}</h1>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-primary text-white px-5 py-2 rounded">
          <h4>Paket</h4>
          <h1>{{ paket }}</h1>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-primary text-white px-5 py-2 rounded">
          <h4>Outlet</h4>
          <h1>{{ outlet }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      paket: 0,
      member: 0,
      transaction: 0,
      outlet: 0,
    };
  },
  methods: {
    fetch() {
      this.axios.get("/member").then((res) => {
        this.member = res.data.data.count;
      });
      this.axios.get("/transaksi").then((res) => {
        this.transaction = res.data.data.count;
      });
      this.axios.get("/outlet").then((res) => {
        this.outlet = res.data.data.count;
      });
      this.axios.get("/paket").then((res) => {
        this.paket = res.data.data.count;
      });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>
