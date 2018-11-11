import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import * as d3Tile from 'd3-tile';
import * as d3Geo from 'd3-geo';

// noinspection JSUnusedGlobalSymbols
@Component
export default class MapViewer extends Vue {
  @Prop({
    required: false,
    default: () => {
      return [-7.584838, 33.561041];
    }
  })
  protected center?: Array<number>;

  @Prop({ required: false, default: 20 })
  protected initialZoom?: number;

  static MIN_ZOOM = 10;
  static MAX_ZOOM = 27;

  width = 0;
  height = 0;

  translateX = 0;
  translateY = 0;

  touchStarted = false;
  touchLastX = 0;
  touchLastY = 0;

  zoom = this.initialZoom ? this.initialZoom : 20;
  scale = this.initialZoom ? 1 << +this.initialZoom : 1 << 20;

  get projection() {
    return d3Geo
      .geoMercator()
      .scale(+this.scale / (2 * Math.PI))
      .translate([this.width / 2, this.height / 2])
      .center(this.center);
  }

  get tiles() {
    return d3Tile
      .tile()
      .size([this.width, this.height])
      .scale(+this.scale)
      .translate(this.projection([0, 0]))();
  }

  @Watch('zoom')
  onZoom(zoom: number) {
    // const k = zoom - prevZoom > 0 ? 2 : .5;
    //
    // this.scale = 1 << zoom;
    // this.translateY = this.height / 2 - k * (this.height / 2 - this.translateY);
    // this.translateX = this.width / 2 - k * (this.width / 2 - this.translateX);

    const rect = this.$el.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;
    this.translateX = this.width / 2;
    this.translateY = this.height / 2;

    this.scale = 1 << zoom;

    console.log(zoom);
    console.log(this.scale);
  }

  // noinspection JSUnusedGlobalSymbols
  mounted() {
    const rect = this.$el.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;
  }

  onTouchStart(e: any) {
    this.touchStarted = true;

    this.touchLastX = e.clientX;
    this.touchLastY = e.clientY;
  }

  onTouchEnd() {
    this.touchStarted = false;
  }

  onTouchMove(e: any) {
    if (this.touchStarted) {
      this.translateX = this.translateX + e.clientX - this.touchLastX;
      this.translateY = this.translateY + e.clientY - this.touchLastY;

      this.touchLastX = e.clientX;
      this.touchLastY = e.clientY;
    }
  }

  zoomIn() {
    this.zoom = Math.min(this.zoom + 1, MapViewer.MAX_ZOOM);
  }

  zoomOut() {
    this.zoom = Math.max(this.zoom - 1, MapViewer.MIN_ZOOM);
  }

  render() {
    if (this.width <= 0 || this.height <= 0) {
      return <div class="map" />;
    }

    return (
      <div class="map">
        <div class="map__controls">
          <button class="map__button" disabled={this.zoom >= MapViewer.MAX_ZOOM} onClick={this.zoomIn}>
            +
          </button>

          <button class="map__button" disabled={this.zoom <= MapViewer.MIN_ZOOM} onClick={this.zoomOut}>
            -
          </button>
        </div>

        <svg
          viewBox={`0 0 ${this.width} ${this.height}`}
          onMousedown={this.onTouchStart}
          onMousemove={this.onTouchMove}
          onMouseup={this.onTouchEnd}
          onMouseleave={this.onTouchEnd}
        >
          <g>
            {this.tiles.map((t: any, i: any) => (
              <image
                class="map__tile"
                key={`${t.x}_${t.y}_${t.z}_${i}`}
                xlinkHref={`https://a.tile.openstreetmap.org/${t.z}/${t.x}/${t.y}.png `}
                x={(t.x + this.tiles.translate[0]) * this.tiles.scale}
                y={(t.y + this.tiles.translate[1]) * this.tiles.scale}
                width={this.tiles.scale}
                height={this.tiles.scale}
              />
            ))}
          </g>
        </svg>

        <div class="map__copyright">
          ©&nbsp;
          <a href="https://www.openstreetmap.org/copyright" target="_blank">
            OpenStreetMap&nbsp;
          </a>
          contributors
        </div>
      </div>
    );
  }
}
