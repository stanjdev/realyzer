import { useEffect, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
const API_KEY = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../redux/ValuesReducer';

export default function MapView() {
  const global = useSelector(state => state.values);
  const dispatch = useDispatch();

  const renderMap = useCallback(() => {
    loadScript("https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js");
    loadScript("https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js")
    loadScript("https://unpkg.com/es6-promise@4.2.4/dist/es6-promise.auto.min.js")
    loadScript("https://unpkg.com/@mapbox/mapbox-sdk/umd/mapbox-sdk.min.js")
    // window.initMap = initMap;
    // window.initMap();
  }, []);

  useEffect(() => {
    renderMap();
  }, [renderMap])

  const loadAddress = useCallback( async () => {
    mapboxgl.accessToken = API_KEY;

    // const coords = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${global.address || "USA"}.json?access_token=${API_KEY}`)
    const coords = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${global.address || "USA"}.json?access_token=${API_KEY}`)
    const response = await coords.json();
    // console.log(response.features[0].center[0], response.features[0].center[1]);
    // console.log(response);
    if (!response.features || !response.features[0]) {
      alert("Location Not Found!");
      return;
    }

    if (response.features[0].context && response.features[0].context[3]) {
      console.log(response.features[0].context[3].text)
      dispatch(changeValue(response.features[0].context[3].text, "americanState"))
      // This gives you the state to match with the property taxes!
    }
    
    var geojson = {
      type: 'FeatureCollection',
      features: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: response.features ? response.features[0].center : [-96, 37.8]
          },
        }
    };
    
    let coors = geojson.features.geometry.coordinates;

      var map = new mapboxgl.Map({
        container: 'mapViewMap',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [-96, 37.8],
        zoom: 3
      });

      map.on("load", () => {
        map.resize();
      })

      // create a HTML element for each feature
      // var el = document.createElement('div');
      // el.className = 'marker';
      // let myMarker = new mapboxgl.Marker(el);

      let myMarker = new mapboxgl.Marker();
      myMarker.setLngLat(coors)
      .addTo(map);

      function flyToArea(currentFeature) {
        map.flyTo({
          center: coors,
          zoom: 10
        });
      }

      flyToArea(myMarker);
  });

  useEffect(() => {
    loadAddress();
  }, [])

  return(
    <div className={styles.mortgage}>
      <div id="mapViewContainer">
        <div id='mapViewMap'></div>
      </div>
     </div>
  )
};


// Loads the MapBox API script
function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  // const head = window.document.getElementsByTagName('head')[0];
  const script = window.document.createElement('script');
  // script.type = "text/javascript"
  script.src = url;
  // script.async = true;
  // script.defer = true;
  // head.append(script);
  index.parentNode.insertBefore(script, index);
  // console.log('loadScript script loaded')
};