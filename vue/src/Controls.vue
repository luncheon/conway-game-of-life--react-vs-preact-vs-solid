<template>
  <aside>
    <table>
      <tbody>
        <tr>
          <td>Cell Size:</td>
          <td><input type="number" v-model="cellSize" /></td>
        </tr>
        <tr>
          <td>World Width:</td>
          <td><input type="number" v-model="worldWidth" /></td>
        </tr>
        <tr>
          <td>World Height:</td>
          <td><input type="number" v-model="worldHeight" /></td>
        </tr>
      </tbody>
    </table>
    <button v-if="running" type="button" @click="running = false">Stop</button>
    <button v-else type="button" @click="running = true">Start</button>
    <button type="button" @click="cells = init(worldWidth, worldHeight)">Randomize</button>
    <div>{{ fps }}</div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as state from './state'
import { init } from '../../common/core'

export default defineComponent(() => ({ ...state, init }))
</script>
