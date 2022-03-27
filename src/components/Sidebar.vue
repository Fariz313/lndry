<template>
  <aside class="left-sidebar" data-sidebarbg="skin6">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar">
      <!-- Sidebar navigation-->
      <nav class="sidebar-nav">
        <ul id="sidebarnav">
          <!-- User Profile-->
          <li class="sidebar-item pt-2">
            <router-link
              class="sidebar-link waves-effect waves-dark sidebar-link"
              to="/"
              aria-expanded="false"
            >
              <i class="far fa-clock" aria-hidden="true"></i>
              <span class="hide-menu">Dashboard</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link waves-effect waves-dark sidebar-link"
              to="/transaksi"
              aria-expanded="false"
            >
              <i class="fa fa-table" aria-hidden="true"></i>
              <span class="hide-menu">Transaksi</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link waves-effect waves-dark sidebar-link"
              to="/member"
              aria-expanded="false"
            >
              <i class="fa fa-table" aria-hidden="true"></i>
              <span class="hide-menu">Member</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link waves-effect waves-dark sidebar-link"
              to="/user"
              aria-expanded="false"
            >
              <i class="fa fa-table" aria-hidden="true"></i>
              <span class="hide-menu">User</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link waves-effect waves-dark sidebar-link"
              to="/paket"
              aria-expanded="false"
            >
              <i class="fa fa-table" aria-hidden="true"></i>
              <span class="hide-menu">Paket</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              class="sidebar-link waves-effect waves-dark sidebar-link"
              to="/outlet"
              aria-expanded="false"
            >
              <i class="fa fa-table" aria-hidden="true"></i>
              <span class="hide-menu">Outlet</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
  </aside>
</template>
