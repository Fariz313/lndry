<template>
  <div class="text-left">
    <h2>Member</h2>
    <div class="card bg-white w-100 p-3">
      <table id="member" class="display" style="width: 100%">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Jenis Kelamin</th>
            <th>Teleepon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in member" :key="index">
            <td>{{ item.nama }}</td>
            <td>{{ item.alamat }}</td>
            <td v-if="item.jenis_kelamin == 'l'">Laki-laki</td>
            <td v-if="item.jenis_kelamin == 'p'">Perempuan</td>
            <td>{{ item.tlp }}</td>
            <td>
              <router-link
                :to="'/member/create?id=' + item.id_member"
                class="btn mx-2 btn-warning"
                >Edit</router-link
              >
              <button
                @click="deleteData(item.id_member)"
                class="btn mx-2 btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      member: [],
    };
  },
  methods: {
    fetch() {
      this.disabled(true);
      this.axios.get("/member").then((response) => {
        this.member = response.data.data.member;
        $(document).ready(function () {
          $("#member").DataTable();
        });
        this.disabled(false);
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
    deleteData(id) {
      this.disabled(true);
      this.axios
        .delete("/member/" + id)
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
