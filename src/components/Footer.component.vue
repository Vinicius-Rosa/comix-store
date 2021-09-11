<template>
  <footer>
    <h3>
      Developed with ❤ by
      <a href="https://github.com/Vinicius-Rosa" target="_blank">
        Vinicius Rosa
      </a>
    </h3>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #000;

  height: 80px;
  width: 100%;
}

a {
  color: pink;
}
</style>