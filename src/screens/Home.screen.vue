<template>
  <div data-type="fragment">
    <Carousel :shouldRender="comics.length > 0" />

    <div class="comics-container">
      <h1>As melhores só aqui!</h1>
      <ComicList
        :comics="comics"
        :count="count"
        :total="total"
        :comicPerPage="comicPerPage"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import fetchComics from "@/services/comics";
import { Carousel, ComicList } from "../components";
import { getRandom } from "@/global/utils";

export default {
  name: "Home",
  components: { Carousel, ComicList },
  data() {
    return {
      comics: [],
      count: 0,
      total: 0,
      comicPerPage: 8,
    };
  },
  beforeMount() {
    (async () => {
      this.showLoader(true);
      const { data } = await fetchComics.getComics();
      const { count, total, results } = data.data;

      const maxNumber = results.length;
      const rarePercentage = 2;
      const rareIndexArr = getRandom(maxNumber, rarePercentage);

      //Define as hqs raras
      rareIndexArr.map((rareIndex) => {
        const rareItem = results.find((_, i) => i === rareIndex);
        results.splice(rareIndex, 1, { ...rareItem, rare: true });

        return { ...rareItem, rare: true };
      });

      this.comics = results;
      this.count = count;
      this.total = total;
      this.showLoader(false);
    })();
  },
  methods: {
    ...mapActions(["showLoader"]),
  },
};
</script>

<style scoped>
.comics-container {
  margin: 0 100px;
  margin-top: 20px;

  text-align: start;
  color: #fff;
}

.comics-container h1 {
  font-size: 4rem;
}

@media (max-width: 1200px) {
  .comics-container {
    margin: 0 50px;
    margin-top: 50px;
  }
}
</style>