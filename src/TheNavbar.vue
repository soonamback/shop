<template>
    <nav class="navbar navbar-expand-lg bg-vue navbar-dark">
      <div class="container">
        <router-link to="/shop" class="navbar-brand">The Shop</router-link>
        <ul class="navbar-nav me-auto">
          <li class="nav-item active">
            <router-link to="/shop" class="nav-link">Start Page</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/shop/create/product" class="nav-link">New Article</router-link>
          </li>
        </ul>
        <button class="btn bg-vue me-3">
          <i class="fas fa-shopping-card"></i> Cart {{ cartSum }} €
        </button>
        <button class="btn bg-vue2" @click="signout()">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  import { mapGetters } from "vuex"
  export default {
    name: "TheNavbar",
    computed: {
      ...mapGetters({ cartSum: "cartTotal" }),
      // cartTotal() {
      //   return this.$store.getters.cartTotal;
      // },
    },
    methods: {
     async signout() {
        try {
         await this.$store.dispatch("signout");
          this.$router.push("/")
        } catch (error) {
          console.log(error)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>