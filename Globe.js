var wwd = new WorldWind.WorldWindow("canvasOne");
document.getElementById("all").addEventListener("click", displayAllLayers);
document.getElementById("base").addEventListener("click", displayBaseLayer);
document.getElementById("aerial").addEventListener("click", displayAerialLayer);
document.getElementById("label").addEventListener("click", displayAerialLabelLayer);
document.getElementById("road").addEventListener("click", displayRoadsLayer);
document.getElementById("atmosphere").addEventListener("click", displayAtmosphereLayer);

function displayAllLayers() {
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.BingAerialLayer(null));
    wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
    wwd.addLayer(new WorldWind.BingRoadsLayer(null));
    wwd.addLayer(new WorldWind.OpenStreetMapImageLayer(null));
    wwd.addLayer(new WorldWind.AtmosphereLayer());
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
}

function displayBaseLayer(){
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
}

function displayAerialLayer() {
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.BingAerialLayer(null));
}
function displayAerialLabelLayer() {
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.BingAerialLayer(null));
    wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
}

function displayRoadsLayer(){
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.BingAerialLayer(null));
    wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
    wwd.addLayer(new WorldWind.BingRoadsLayer(null));
    wwd.addLayer(new WorldWind.OpenStreetMapImageLayer(null));

}

function displayAtmosphereLayer(){
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.BingAerialLayer(null));
    wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer(null));
    wwd.addLayer(new WorldWind.AtmosphereLayer());
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
}