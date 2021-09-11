<template>
  <section id="checkout" class="from-left">
    <div class="no-items" v-if="checkout.length <= 0">
      <h1>
        Ops! :(
        <br /><br />
        Parece que você não tem nenhum item no carrinho ainda...
      </h1>
      <Button text="Continuar comprando!" @click.native="$router.push('/')" />
    </div>
    <div v-if="checkout.length > 0">
      <div class="list">
        <div
          class="list-item_container"
          v-for="item in checkout"
          :key="item.id"
        >
          <router-link :to="`/details/${item.id}`" class="list-item">
            <div class="preview">
              <img :src="imageUrl(item)" alt="" />
            </div>
            <div class="infos">
              <h1 class="title">{{ item.title }}</h1>
              <span class="id">#{{ item.id }}</span>
            </div>
            <div class="price">{{ price(item) }}</div>
          </router-link>
          <button class="remove-item_btn" @click="removeFromCheckout(item.id)">
            Remover
          </button>
        </div>
      </div>

      <div class="bottom">
        <div class="count-infos">
          <div class="shipping">Frete: R${{ shipping }},00</div>
          <div class="discount">Desconto: R${{ discount }}</div>
          <div class="total-price">Total: {{ totalPrice }}</div>
        </div>
        <div class="discount-action">
          Possui um cupom de desconto?
          <Button
            class="apply-coupon"
            text="Aplicar!"
            @click.native="showCouponModal"
          />
        </div>
      </div>
      <Button
        class="finish-buy"
        text="Finalizar"
        @click.native="handleFinish"
      />

      <div class="finished from-left" v-if="finished">
        <div class="finished-card">
          <h1>Obrigado por comprar conosco!</h1>
          <span>Sua encomenda já está a caminho... :)</span>
          <Button
            class="keep-buying"
            text="Continuar comprando!"
            @click.native="keepBuying"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Button from "../components/Button.component.vue";

export default {
  name: "Checkout",
  components: { Button },
  data() {
    return {
      finished: false,
    };
  },
  computed: {
    totalPrice() {
      let total = 0;

      if (this.checkout.length > 0) {
        total = this.checkout
          .map((item) => item.prices && item.prices[0].price)
          .reduce((acc, val) => val + acc);
      }

      const descountedAmount = Number(
        total - Number(this.discount) + this.shipping
      ).toFixed(2);

      return descountedAmount > 0
        ? `R$${descountedAmount}`.replace(".", ",")
        : "Grátis";
    },

    imageUrl() {
      return (item) => `${item.thumbnail.path}.${item.thumbnail.extension}`;
    },

    price() {
      return (item) =>
        item.prices && item.prices[0].price !== 0
          ? `R$${item.prices[0].price}`.replace(".", ",")
          : "Grátis";
    },

    ...mapState({
      checkout: (state) => state.checkout,
      discount: (state) => state.discount,
      shipping: (state) => state.shipping,
    }),
  },

  methods: {
    keepBuying() {
      this.$router.push("/");

      this.resetValues();
    },
    handleFinish() {
      this.finished = true;
    },
    ...mapActions(["removeFromCheckout", "showCouponModal", "resetValues"]),
  },

  destroyed() {
    this.finished = false;
  },
};
</script>

<style scoped>
#checkout {
  text-align: start;
  padding: 100px;

  min-height: calc(100vh - 80px);
}

.no-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 200px);
  width: 100%;
  /* max-width: 500px; */
}

.no-items > h1 {
  font-size: 1.6rem;
  font-weight: bold;

  text-align: center;
  line-height: 1.2;
  letter-spacing: 2.5px;
}

.no-items > h1,
.no-items > button {
  max-width: 500px;
}

.list-item {
  position: relative;
  display: flex;

  background-color: #fff;
  color: #000;

  width: 100%;

  padding: 20px;
}

.list-item:not(:first-of-type) {
  margin-top: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}

.preview {
  height: 80px;
}

.preview img {
  max-height: 80px;
}

.infos {
  margin: 0 25px;
  width: 100%;
}

.id {
  display: block;
  margin-top: 5px;
}

.remove-item_btn {
  color: #dc3545;
  margin: 5px 0;

  transition: 0.4s;
}

.remove-item_btn:hover {
  color: #fff;
}

.price {
  justify-self: flex-end;

  font-weight: bold;
  font-size: 2rem;

  color: #18cc8d;
}

.shipping,
.discount {
  font-size: 1.2rem;
  margin-top: 5px;
}

.total-price {
  font-size: 2rem;
  font-weight: bold;
  color: #18cc8d;

  margin: 25px 0;
}

.bottom {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;
  margin-top: 50px;
}

.apply-coupon {
  margin-top: 10px;
}

.finished {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.8);

  z-index: 1000 !important;
}

.finished-card {
  background: #fff;
  color: #000;

  padding: 50px;
}

.finished-card h1 {
  font-weight: bold;
  font-size: 2rem;
}

.finished-card span {
  display: block;
  margin: 20px 0;
}

.keep-buying {
  background-color: #000;
  color: #fff;
}

@media (max-width: 1200px) {
  #checkout {
    padding: 100px 50px;
  }
}

@media (max-width: 850px) {
  .title,
  .price {
    font-size: 1.2rem;
  }

  .bottom {
    flex-direction: column-reverse;
  }

  .discount-action {
    display: flex;
    align-items: center;

    width: 100%;
    margin-bottom: 20px;
  }

  .apply-coupon {
    max-width: 120px;
    margin: 0 20px;

    background-color: transparent;
    color: #18cc8d;
  }

  .finished-card h1 {
    font-weight: bold;
    font-size: 1.6rem;
  }
}

@media (max-width: 450px) {
  .infos {
    margin-left: 0;
  }

  .title,
  .price {
    font-size: 1rem;
  }

  .preview img {
    display: none;
  }

  .apply-coupon {
    max-width: 80px;
  }
}
</style>