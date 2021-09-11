<template>
  <div :class="`card ${item.rare ? 'special' : ''}`">
    <router-link :to="`/details/${item.id}`" class="content">
      <div>
        <h3>{{ item.title }}</h3>
        <span>{{ item.pageCount }} páginas</span>
        <h3 class="price">
          <span class="rare-comic" v-if="item.rare">Raro!</span>
          {{ price }}
        </h3>
      </div>
    </router-link>
    <div
      class="background"
      :style="{
        backgroundImage: imageUrl,
      }"
    ></div>
    <button class="buy-now" @click="handleBuy(item)">Comprar!</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Card",
  props: ["item"],
  computed: {
    price() {
      return this.item.prices && this.item.prices[0].price !== 0
        ? `R$${this.item.prices[0].price}`.replace(".", ",")
        : "Grátis";
    },

    imageUrl() {
      return `url(${this.item.thumbnail.path}.${this.item.thumbnail.extension})`;
    },
  },

  methods: {
    handleBuy(item) {
      this.setCheckout(item);
      this.$router.push("/checkout");
    },
    ...mapActions(["setCheckout"]),
  },
};
</script>

<style scoped>
.card {
  position: relative;

  display: flex;
  flex-direction: column;
  text-align: initial;

  color: #fff;

  width: 350px;
  height: 500px;
  margin-top: 50px;
}

.special:after {
  position: absolute;
  content: "";
  /* top: 5vw; */
  top: 20px;
  left: 0;
  right: 0;
  z-index: -1;
  height: 86%;
  width: 50%;
  margin: 0 auto;

  /* transform: scale(0.6); */
  -webkit-filter: blur(5vw);
  -moz-filter: blur(5vw);
  -ms-filter: blur(5vw);
  filter: blur(5vw);
  background-color: #ffd700;
}

.card h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.card span {
  display: block;
  margin-top: 20px;
  /* color: #bbbbbb; */
}

.card .content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  padding: 25px;

  background: linear-gradient(
    0deg,
    #07060a 0,
    rgba(11, 11, 14, 0.2) 25%,
    rgba(7, 6, 10, 0.2) 50%,
    rgba(7, 6, 8, 0.9) 100%
  );

  z-index: 2;
  cursor: pointer;
}

.card:hover button {
  bottom: 0;
  opacity: 1;
}

.rare-comic {
  color: #ffd700;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 !important;
}

.background {
  position: absolute;

  height: 100%;
  width: 100%;
  background-size: cover;
  transition: 0.3s ease-in-out;
}

.price {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  color: #18cc8d;
}

button {
  position: absolute;
  bottom: -50px;
  opacity: 0;

  height: 50px;
  width: 100%;

  background: #3d3d3d;
  color: white;

  z-index: 2;
  transition: 0.4s;
}

button:hover {
  height: 50px;
  background: #18cc8d;
  color: white;
}

@media (max-width: 850px) {
  button {
    bottom: 0 !important;
    opacity: 1 !important;
  }
}
</style>