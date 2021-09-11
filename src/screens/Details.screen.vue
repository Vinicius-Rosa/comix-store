<template>
  <section id="details">
    <div class="error" :hidden="!hasError">
      <h3>Erro inesperado! Não foi possível carregar o conteúdo :(</h3>
    </div>

    <div class="content">
      <div class="preview">
        <img :src="imgUrl" alt="" />
      </div>

      <div class="infos">
        <div class="header">
          <h1>{{ item.title }}</h1>
          <span>{{ item.pageCount }} páginas</span>
        </div>
        <p>
          {{ item.description }}
        </p>

        <span class="price">
          {{ price }}
        </span>
        <Button text="Comprar" @click.native="handleBuy(item)" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import fetchComics from "@/services/comics";
import Button from "@/components/Button.component.vue";

export default {
  name: "Details",
  data() {
    return {
      item: {},
      images: [],

      hasError: false,
    };
  },
  components: { Button },
  methods: {
    handleBuy(item) {
      this.setCheckout(item);
      this.$router.push("/checkout");
    },
    ...mapActions(["showLoader", "setCheckout"]),
  },
  computed: {
    price() {
      return this.item.prices && this.item.prices[0].price !== 0
        ? `R$${this.item.prices[0].price}`.replace(".", ",")
        : "Grátis";
    },

    imgUrl() {
      return this.images.length > 0
        ? this.images[0].path + "." + this.images[0].extension
        : "";
    },
  },

  beforeMount() {
    (async () => {
      this.showLoader(true);
      const { data } = await fetchComics.findComic(this.$route.params.id);
      const { results } = data.data;

      this.item = results[0];
      this.images = [results[0].thumbnail, ...results[0].images];

      this.showLoader(false);
    })();
  },
};
</script>

<style scoped>
#details {
  padding: 100px;

  text-align: start;
}

.content {
  display: flex;
}

.preview {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 80vh;

  margin-right: 50px;
  margin-bottom: 50px;
}

.preview img {
  max-height: 100%;
}

.infos {
  height: 100%;
}

.infos .header {
  margin-bottom: 50px;
}

.infos h1 {
  font-size: 4rem;
  font-weight: bold;
}

.infos span {
  display: block;

  margin-left: 5px;
  margin-top: 20px;

  font-size: 1.2rem;
  color: #18cc8d;
}

.infos p {
  text-align: justify;
}

.infos .price {
  font-size: 2.2rem;
  font-weight: bold;
  text-transform: uppercase;

  margin-top: 50px;
}

.error {
  background-color: #fff;
  color: #000;

  padding: 50px;
  margin: 50px 0;

  font-size: 1.2rem;
}

@media (max-width: 1200px) {
  .content {
    flex-direction: column;
  }

  .preview {
    margin-right: unset;
  }
}

@media (max-width: 850px) {
  #details {
    padding: 100px 50px;
  }

  .infos h1 {
    font-size: 3.6rem;
    font-weight: bold;
  }
}
</style>