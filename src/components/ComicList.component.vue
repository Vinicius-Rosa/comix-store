<template>
  <div>
    <div class="comics">
      <Card
        class="from-left"
        v-for="comic in currentComics"
        :key="comic.id"
        :item="comic"
      />
    </div>
    <div class="paginate">
      <button @click="prevPage()">
        {{ prevLabel }}
      </button>
      <button
        v-for="(pageBtn, index) of new Array(parseInt(totalPages))"
        :key="index"
        :class="currentPage === index ? 'active' : ''"
        @click="() => setCurrentPage(index)"
      >
        {{ index + 1 }}
      </button>
      <button @click="nextPage()">
        {{ nextLabel }}
      </button>
    </div>
  </div>
</template>

<script>
import Card from "./Card.component.vue";

export default {
  name: "ComicList",
  components: { Card },
  props: ["comics", "count", "total", "comicPerPage"],
  data() {
    return {
      prevLabel: "<",
      nextLabel: ">",

      allComics: this.comics,
      currentPage: 0,
    };
  },

  methods: {
    setCurrentPage(value) {
      this.currentPage = value;
    },

    prevPage() {
      if (this.currentPage > 0) this.currentPage -= 1;
    },
    nextPage() {
      if (this.currentPage < this.currentComics.length) this.currentPage += 1;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(parseInt(this.count) / parseInt(this.comicPerPage));
    },
    currentComics() {
      const auxiliarArray = this.comics || [];
      return auxiliarArray?.slice(
        this.currentPage * this.comicPerPage,
        this.currentPage * this.comicPerPage + this.comicPerPage
      );
    },
  },
};
</script>

<style scoped>
.comics {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  gap: 50px;

  margin: 0;

  margin-bottom: 50px;
}

.paginate {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;

  width: 100%;

  margin: 50px 0;
}

.paginate button {
  background-color: #fff;
  color: #000;

  text-align: center;

  width: 40px;
  height: 50px;

  transition: 0.4s;
}

.paginate button:hover,
.active {
  background-color: #18cc8d !important;
  color: #fff !important;
}
</style>