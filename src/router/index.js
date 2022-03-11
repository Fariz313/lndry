import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import Outlet from '../views/Outlet/Outlet.vue'
import CreateOutlet from '../views/Outlet/CreateOutlet.vue'
import Member from '../views/Member/Member.vue'
import CreateMember from '../views/Member/CreateMember.vue'
import Paket from '../views/Paket/Paket.vue'
import CreatePaket from '../views/Paket/CreatePaket.vue'
import Transaksi from '../views/Transaksi/Transaksi.vue'
import CreateTransaksi from '../views/Transaksi/CreateTransaksi.vue'
import User from '../views/User/User.vue'
import Laporan from '../views/Transaksi/Laporan.vue'
import CreateUser from '../views/User/CreateUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{requiresAuth: true},
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta:{layout:'no-sidebar'},
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta:{layout:'no-sidebar'},
    component: Register
  },
  {
    path: '/outlet',
    name: 'Outlet',
    meta:{requiresAuthAdmin: true},
    component: Outlet
  },
  {
    path: '/outlet/create',
    name: 'CreateOutlet',
    meta:{requiresAuthAdmin: true},
    component: CreateOutlet
  },
  {
    path: '/member',
    name: 'Member',
    meta:{requiresAuthAdmin: true},
    component: Member
  },
  {
    path: '/member/create',
    name: 'CreateMember',
    meta:{requiresAuthAdmin: true},
    component: CreateMember
  },
  {
    path: '/paket',
    name: 'Paket',
    meta:{requiresAuthAdmin: true},
    component: Paket
  },
  {
    path: '/paket/create',
    name: 'CreatePaket',
    meta:{requiresAuthAdmin: true},
    component: CreatePaket
  },
  {
    path: '/user',
    name: 'User',
    meta:{requiresAuthAdmin: true},
    component: User
  },
  {
    path: '/user/create',
    name: 'CreateUser',
    meta:{requiresAuthAdmin: true},
    component: CreateUser
  },
  {
    path: '/transaksi',
    name: 'Transaksi',
    meta:{requiresAuth: true},
    component: Transaksi
  },
  {
    path: '/transaksi/create',
    name: 'CreateTransaksi',
    meta:{requiresAuth: true},
    component: CreateTransaksi
  },
  {
    path: '/laporan',
    name: 'Laporan',
    meta:{requiresAuthOwner: true,layout:'no-sidebar'},
    component: Laporan
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else if(to.matched.some(record => record.meta.requiresAuthOwner)) {
    if (store.getters.isLoggedIn) {
      console.log(store.getters.userDetail.role);
      if(store.getters.userDetail.role=='owner' || store.getters.userDetail.role=='admin'){
        next()
        return
      }else{
        return
      }
    }else{
      next('/login') 
    }
  } else if(to.matched.some(record => record.meta.requiresAuthAdmin)) {
    if (store.getters.isLoggedIn) {
      if(store.getters.userDetail.role=='admin'){
        next()
        return
      }else{
        return
      }
    }else{
      next('/login') 
    }
  } else {
    next() 
  }
})
export default router
