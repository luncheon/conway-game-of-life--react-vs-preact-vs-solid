<template>
  <table style="table-layout: fixed">
    <tbody>
      <tr v-for="y in worldHeight" :key="y">
        <td
          v-for="x in worldWidth"
          :key="x"
          class="cell"
          :class="{'cell-alive': cells.get(x, y)}"
          :style="{width: cellSize, height: cellSize}"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as state from './state'

export default defineComponent(() => state)
</script>
