<template>
  <button :id="id" :style="innerstyle" :class="classname || ''">
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["classname", "text", "innerstyle", "id"],
};
</script>

<style scoped>
button {
  position: relative;
  font-size: 1.2rem;

  margin-top: 30px;
  min-height: 40px;
  width: 100%;

  background-color: #fff;
  color: #000;
  cursor: pointer;
}

button span {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
  transition: 0.1s;
}

button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: 0;

  background-color: #15f4a8;
  color: #fff;

  transition: 0.4s;
}

button:hover span {
  color: #fff;
}
button:hover::before {
  width: 100%;
}
</style>