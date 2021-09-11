<template>
  <section id="comics-by-hero">
    <h1 class="title">As melhores de {{ hero }}</h1>
    <ComicList
      :comics="comics"
      :count="count"
      :total="total"
      :comicPerPage="comicPerPage"
    />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import fetchComics from "@/services/comics";
import heroList from "@/data/heroList";
import { ComicList } from "../components";
import { getRandom } from "@/global/utils";

export default {
  name: "ComicsByHero",
  components: { ComicList },
  data() {
    return {
      comics: [],
      count: 0,
      total: 0,
      comicPerPage: 8,

      heroes: heroList || [],
    };
  },
  beforeMount() {
    (async () => {
      this.showLoader(true);
      const { data } = await fetchComics.getHeroComics(this.$route.params.id);
      const { count, total, results } = data.data;

      const maxNumber = results.length;
      const rarePercentage = 2;
      const rareIndexArr = getRandom(maxNumber, rarePercentage);

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
  computed: {
    hero() {
      const { title } = this.heroes.find(
        (item) => item.id === Number(this.$route.params.id)
      );

      return title;
    },
  },
  methods: {
    ...mapActions(["showLoader"]),
  },
};
</script>

<style scoped>
#comics-by-hero {
  padding: 100px;
  text-align: start;
}

#comics-by-hero .title {
  font-size: 4rem;
  font-weight: bold;
}

@media (max-width: 1200px) {
  #comics-by-hero {
    padding: 100px 50px;
  }
}

@media (max-width: 850px) {
  #comics-by-hero .title {
    font-size: 2rem;
  }
}
</style>