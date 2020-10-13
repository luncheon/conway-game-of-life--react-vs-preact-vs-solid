<template>
  <h1 style="text-align: center">
    <a target="_blank" rel="noopener noreferrer" href="https://v3.vuejs.org/">Vue.js</a>
  </h1>
  <main>
    <World />
    <Controls />
  </main>
</template>

<script lang="ts">
import World from './World.vue'
import Controls from './Controls.vue'

export default { components: { World, Controls } }
</script>
