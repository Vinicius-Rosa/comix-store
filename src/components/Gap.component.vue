<template>
  <div :style="{ height: height || '50px' }" />
</template>

<script>
export default {
  name: "Gap",
  props: ["height"],
};
</script>

<style scoped>
</style>