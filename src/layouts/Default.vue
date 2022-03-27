<template>
  <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
        data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
    <Navbar />
    <Sidebar />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <div class="container-fluid">
            <slot />
        </div>
      </div>
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2021</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Sidebar,
    Navbar,
  },
};
</script>
