<template>
  <div id="app">
    <Loader />
    <CouponModal />
    <Header />

    <router-view />
    <Footer />
  </div>
</template>

<script>
import { Header, Footer, Loader, CouponModal } from "@/components";
export default {
  name: "App",
  components: { Header, Footer, Loader, CouponModal },
};
</script>


<style>
@import url("global/styles/reset.css");
@import url("global/styles/animations.css");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap");
#app {
  font-family: "Poppins", sans-serif;
  text-align: center;
  min-width: 100vw;
  min-height: 100vh;
  color: #fff;

  /* background: #15f4a8; */
  background: #000;
}
</style>