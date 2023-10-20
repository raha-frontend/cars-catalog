<template>
  <div class="app">
    <div class="container">
      <the-header />

			<router-view></router-view>

			<notifications />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/TheHeader.vue"

export default defineComponent({
  name: "App",

  components: {
		TheHeader,
  },
});
</script>

<style lang="scss">
:root {
	--color-border: #e5e5e5;
	--color-red: #ed1c21;
	--color-black: #231f1e;
}

* {
	box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
}

.container {
  width: 1200px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;
}

img {
	max-width: 100%;
	height: auto;
}
</style>
