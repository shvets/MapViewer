<template>
  <div class="map-viewer">
    <map-viewer-component/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MapViewerComponent from '@/components/MapViewerComponent';

// noinspection JSUnusedGlobalSymbols
@Component({
  components: {
    MapViewerComponent
  }
})
export default class MapViewer extends Vue {}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  cursor: default;
  width: 100vw;
  height: 100vh;
}

.map-viewer {
  height: 600px;
}

.map {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: Arial, sans, sans-serif;

  &__controls {
    position: absolute;
    left: 16px;
    top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 56px;
  }
  &__button {
    border: 0;
    padding: 0;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    font-size: 18px;
    background-color: #ffffff;
    color: #343434;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);

    &:hover,
    &:focus {
      background-color: #eeeeee;
    }

    &:disabled {
      background-color: rgba(#eeeeee, 0.4);
    }
  }
  &__tile {
    pointer-events: none;
  }
  &__copyright {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 2px 4px;
    background-color: rgba(#ffffff, 0.6);
    font-size: 14px;
  }
}
</style>
