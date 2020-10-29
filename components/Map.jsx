import { useEffect, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import mapboxSdk from '@mapbox/mapbox-sdk';
import MapboxClient from '@mapbox/mapbox-sdk';
import MapboxGeocoder from '@mapbox/mapbox-sdk'
const API_KEY = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeValue } from '../redux/ValuesReducer';


export default function Map() {
  const global = useSelector(state => state.values);
  const dispatch = useDispatch();
  
  const [checked, setChecked] = useState(false);

  // MAP TOGGLE SHOW/HIDE
  const toggleMap = (e) => {
    if (!checked) {
      setChecked(true)
    } else {
      setChecked(false)
    }
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  useEffect(() => {
    const mapContainer = document.querySelector('#mapContainer');
    checked ? mapContainer.style.display = "block" : mapContainer.style.display = "none";
  }, [checked])
  


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
    const coords = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${global.address || "USA"}.json?access_token=pk.eyJ1Ijoic3Rhbi1kZXYiLCJhIjoiY2tlYm9leWpjMGFpMjJ0cndybWdpbmVwMSJ9.I0CXw1DFG7WYKgyVm7x07A`)
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
    
    // Need error handling for all the misspells, random stuff users will type. maybe a button and throw errors instead? So not fetching requests via every keystroke? GOING WITH THE BUTTON INSTEAD

    
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


    // remove previous markers
    // setTimeout(() => {
      // if (currentMarkers.current !== businesses) {
      //   currentMarkers.current.forEach(marker => marker.remove());
      //   currentMarkers.current = [];
      //   // console.log("remove existing markers!", currentMarkers)
      // }
    // }, 2000);
  
    
    // create a HTML element for each feature
    // var el = document.createElement('div');
    // el.className = 'marker';
    
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [-96, 37.8],
        zoom: 3
      });

      map.on("load", () => {
        map.resize();
      })

      let myMarker = new mapboxgl.Marker();
      myMarker.setLngLat(coors)
      .addTo(map);

      function flyToArea(currentFeature) {
        map.flyTo({
          center: coors,
          zoom: 8
        });
      }

      flyToArea(myMarker);

      // function flyToSpot(currentFeature) {
      //   map.flyTo({
      //     center: coors,
      //     zoom: 11
      //   });
      // }
      
      // el.addEventListener('click', function(e) {
      //   flyToSpot(marker);
      // })


      
  });


  useEffect(() => {
    loadAddress();
  }, [])




  return(
    <div className={styles.mortgage}>
      {/* <div className="mapButtContainer">
        <button className="mapButton" onClick={handleClick}>{buttonStatus}</button>
      </div> */}

      <div className={`mapToggle`}>
        <p>Hide Map</p>
        <label className="switch"> 
          <input type="checkbox" onChange={toggleMap} checked={checked}/>
          <span className="slider round"></span>
        </label>
        <p>Show Map</p>
      </div>

      <button onClick={global.address ? loadAddress : null}>Search Address</button>
      <span>State: {global.americanState ? <span>{global.americanState}</span> : null}</span>

      <div id="mapContainer">
        <div id='map'></div>
      </div>
     </div>
  )
}



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
  console.log('loadScript script loaded')
};