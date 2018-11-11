<template>
  <div class="map-viewer">
    <map-viewer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MapViewer from '@/components/MapViewer.vue';

// noinspection JSUnusedGlobalSymbols
@Component({
  components: {
    MapViewer
  }
})
export default class MapViewerPage extends Vue {}
</script>
