<template>
  <div class="modal" :hidden="!couponModal" @click="close">
    <div class="coupon-form from-left">
      <button class="close-button" @click="hideCouponModal">
        <i class="fas fa-times"></i>
      </button>
      <h1>Insira um cupom válido</h1>

      <div class="input-box">
        <span>Código:</span>
        <input
          type="text"
          placeholder="Digite seu código"
          v-model="code"
          v-uppercase
        />
      </div>
      <span class="error" v-if="error !== ''">{{ error }}</span>

      <Button
        :text="buttonLabel"
        :class="`send-button ${success ? 'success' : ''}`"
        @click.native="send"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import sendCode from "@/services/coupons";
import Button from "./Button.component";

export default {
  name: "CouponModal",
  data() {
    return {
      code: "",
      buttonLabel: "Enviar",
      error: "",
      success: false,
    };
  },
  components: { Button },
  computed: {
    ...mapState({
      couponModal: (state) => state.couponModal,
    }),
  },
  methods: {
    close(e) {
      const thisItem = document.querySelector(".modal");
      if (e.target === thisItem) this.hideCouponModal();
    },

    send() {
      this.buttonLabel = "Enviando...";
      sendCode(this.code.toUpperCase())
        .then((response) => {
          this.buttonLabel = "Ótimo!";
          this.success = true;
          this.setDiscount(response.value);

          setTimeout(() => {
            this.hideCouponModal();
          }, 1000);
        })
        .catch((err) => {
          this.error = err.error;
          this.buttonLabel = "Enviar";
        });
    },
    ...mapActions(["hideCouponModal", "setDiscount"]),
  },
};
</script>

<style>
.modal {
  position: fixed;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.8);
  color: #000;

  text-align: start;

  z-index: 1000;
}

.modal h1 {
  font-size: 2rem;
  text-align: center;

  margin-bottom: 50px;
}

.input-box {
  margin-bottom: 25px;
}

.modal input {
  background: none;
  border: none;
  outline: none;
  border-bottom: 2px solid #ccc;
  line-height: 2rem;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  width: 100%;

  transition: 0.4s;
}

.modal input:focus {
  border-color: #000;
}

.coupon-form {
  position: relative;

  background-color: #fff;
  max-width: 700px;
  width: 100%;
  padding: 50px;
}

.modal .send-button {
  background: #000;
  color: #fff;

  transition: 0.4s;
}

.success {
  background: #18cc8d !important;
}

.error {
  color: red;
  font-size: 0.8rem;
}

.modal .close-button {
  position: absolute;
  top: 30px;
  right: 45px;

  padding: 5px;

  box-sizing: border-box;

  cursor: pointer;
  transition: 0.4s;
}

.close-button:hover {
  transform: scale(1.2);
}
</style>