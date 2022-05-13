var wms = document.getElementById("wms")
var nka = document.getElementById("nka")
var cs = document.getElementById("cs")
wms.onclick = function () {
    var wwd = new WorldWind.WorldWindow("canvas");

    var layers = [
        {layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        {layer: new WorldWind.BingAerialLayer(null), enabled: false},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: false},
        {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
        {layer: new WorldWind.AtmosphereLayer(), enabled: true},
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }

    var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
    var layerName = "MOD_LSTD_CLIM_M";

    var createLayer = function (xmlDom) {
        var wms = new WorldWind.WmsCapabilities(xmlDom);
        var wmsLayerCapabilities = wms.getNamedLayer(layerName);
        var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
        wmsConfig.title = "Average Surface Temp";
        var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
         wwd.addLayer(wmsLayer);
    }
}

nka.onclick = function() {
    var wwd = new WorldWind.WorldWindow('canvas')
    var BMNGOneImageLayer = new WorldWind.BMNGOneImageLayer();
    var BMNGLayer = new WorldWind.BMNGLayer();
    wwd.addLayer(BMNGOneImageLayer);
    wwd.addLayer(BMNGLayer);


    var starFieldLayer = new WorldWind.StarFieldLayer();
    var atmosphereLayer = new WorldWind.AtmosphereLayer();
    wwd.addLayer(starFieldLayer);
    wwd.addLayer(atmosphereLayer);


    var now = new Date();
    starFieldLayer.time = now;
    atmosphereLayer.time = now;
    var simulatedMillisPerDay = 8000;
    var startTimeMillis = Date.now();

    function runSimulation() {
        var elapsedTimeMillis = Date.now() - startTimeMillis;
        var simulatedDays = elapsedTimeMillis / simulatedMillisPerDay;
        var millisPerDay = 24 * 3600 * 1000;
        var simulatedMillis = simulatedDays * millisPerDay;
        var simulatedDate = new Date(startTimeMillis + simulatedMillis);
        starFieldLayer.time = simulatedDate;
        atmosphereLayer.time = simulatedDate;
        wwd.redraw(); 
        requestAnimationFrame(runSimulation);
    }
    requestAnimationFrame(runSimulation);
    wwd.redraw()
}

cs.onclick = function() {
    var wwd = new WorldWind.WorldWindow("canvas");
    var layers = [
        {layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
        {layer: new WorldWind.AtmosphereLayer(), enabled: true},
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    placemarkAttributes.imageScale = 0.025;
    placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.5,
        WorldWind.OFFSET_FRACTION, 1.0);
    placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/white-dot.png";
    var shapeConfigurationCallback = function (attributes, record) {
        var configuration = {};
        configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

        if (record.isPointType()) { 
            configuration.name = attributes.values.name || attributes.values.Name || attributes.values.NAME;

            configuration.attributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);

            if (attributes.values.pop_max) {
                var population = attributes.values.pop_max;
                configuration.attributes.imageScale = 0.01 * Math.log(population);
            }
        } else if (record.isPolygonType()) { 
            configuration.attributes = new WorldWind.ShapeAttributes(null);
            configuration.attributes.interiorColor = new WorldWind.Color(
                0.375 + 0.5 * Math.random(),
                0.375 + 0.5 * Math.random(),
                0.375 + 0.5 * Math.random(),
                1.0);
            configuration.attributes.outlineColor = new WorldWind.Color(
                0.5 * configuration.attributes.interiorColor.red,
                0.5 * configuration.attributes.interiorColor.green,
                0.5 * configuration.attributes.interiorColor.blue,
                1.0);
        }

        return configuration;
    };

    var shapefileLibrary = "https://worldwind.arc.nasa.gov/web/examples/data/shapefiles/naturalearth";
    var worldLayer = new WorldWind.RenderableLayer("Countries");
    var worldShapefile = new WorldWind.Shapefile(shapefileLibrary + "/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp");
    worldShapefile.load(null, shapeConfigurationCallback, worldLayer);
    wwd.addLayer(worldLayer);

    var cityLayer = new WorldWind.RenderableLayer("Cities");
    var cityShapefile = new WorldWind.Shapefile(shapefileLibrary + "/ne_50m_populated_places_simple/ne_50m_populated_places_simple.shp");
    cityShapefile.load(null, shapeConfigurationCallback, cityLayer);
    wwd.addLayer(cityLayer);
    var fortStory = "https://worldwind.arc.nasa.gov/web/examples/data/shapefiles/misc/FortStory/Trident-Spectre-Indigo-i.shp";
    var fortStoryLayer = new WorldWind.RenderableLayer("Fort Story");
    var fortStoryShapefile = new WorldWind.Shapefile(fortStory);
    fortStoryShapefile.load(null, null, fortStoryLayer);
    wwd.addLayer(fortStoryLayer);
    wwd.redraw()
}

