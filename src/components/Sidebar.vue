<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-tshirt"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Atma Laundry</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <a class="nav-link" href="index.html">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Master</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <router-link
        class="nav-link collapsed"
        to="/Outlet"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Outlet</span>
      </router-link>
      <div
        id="collapseTwo"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/outlet"
            >Outlet List</router-link
          >
          <router-link class="collapse-item" to="/outlet/create"
            >Create Outlet</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link collapsed"
        to="/Outlet"
        data-toggle="collapse"
        data-target="#collapseUser"
        aria-expanded="true"
        aria-controls="collapseUser"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>User</span>
      </router-link>
      <div
        id="collapseUser"
        class="collapse"
        aria-labelledby="headingUser"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/member"
            >User List</router-link
          >
          <router-link class="collapse-item" to="/member/create"
            >Create User</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link collapsed"
        to="/Outlet"
        data-toggle="collapse"
        data-target="#collapseMember"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Member</span>
      </router-link>
      <div
        id="collapseMember"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/member"
            >Member List</router-link
          >
          <router-link class="collapse-item" to="/member/create"
            >Create Member</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link collapsed"
        to="/Outlet"
        data-toggle="collapse"
        data-target="#collapsePaket"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Paket</span>
      </router-link>
      <div
        id="collapsePaket"
        class="collapse"
        aria-labelledby="headingPaket"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/paket"
            >Paket List</router-link
          >
          <router-link class="collapse-item" to="/paket/create"
            >Create Paket</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link collapsed"
        to="/Outlet"
        data-toggle="collapse"
        data-target="#collapseTransaction"
        aria-expanded="true"
        aria-controls="collapseTransaction"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Transaction</span>
      </router-link>
      <div
        id="collapseTransaction"
        class="collapse"
        aria-labelledby="headingTransaction"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" to="/transaction"
            >Transaction List</router-link
          >
          <router-link class="collapse-item" to="/transaction/create"
            >Create Transaction</router-link
          >
        </div>
      </div>
    </li>

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
</template>
