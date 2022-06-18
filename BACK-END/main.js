import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import Map from "ol/Map";
import View from "ol/View";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import ImageWMS from "ol/source/ImageWMS";
import LayerSwitcher from "ol-layerswitcher";
import Group from "ol/layer/Group";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

var base_maps = new Group({
  title: "Base maps",
  layers: [
    new TileLayer({
      title: "Satellite",
      type: "base",
      visible: true,
      source: new XYZ({
        attributions: [
          "Powered by Esri",
          "Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
        ],
        attributionsCollapsible: false,
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 23,
      }),
    }),

    new TileLayer({
      title: "OSM",
      type: "base",
      visible: true,
      source: new OSM(),
    }),
  ],
});

var ind_dist = new ImageLayer({
  title: "india_district",
  //extent: [-13884991, 2870341, -7455066, 6338219],
  source: new ImageWMS({
    url: "http://localhost:8084/geoserver/wms",
    params: { LAYERS: "india:india_district" },
    ratio: 1,
    serverType: "geoserver",
  }),
});
var overlays = new Group({
  title: "Overlays",
  layers: [],
});

overlays.getLayers().push(ind_dist);
var view = new View({
  center: [0, 0],
  zoom: 2,
});
var map = new Map({
  target: "map",
  view: view,
  layers: [],
});
map.addLayer(base_maps);
map.addLayer(overlays);
var layerSwitcher = new LayerSwitcher({
  activationMode: "click",
  startActive: true,
  tipLabel: "Layers", // Optional label for button
  groupSelectStyle: "children", // Can be 'children' [default], 'group' or 'none'
  collapseTipLabel: "Collapse layers",
});
map.addControl(layerSwitcher);
layerSwitcher.renderPanel();
var vectorLayer = new VectorLayer({
  title: "vector_layer",
  // background: '#1a2b39',
  source: new VectorSource({
    url: "http://localhost:8084/geoserver/india/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=india%3Aindia_state&maxFeatures=50&outputFormat=application%2Fjson",
    format: new GeoJSON(),
  }),
});
overlays.getLayers().push(vectorLayer);
layerSwitcher.renderPanel();
