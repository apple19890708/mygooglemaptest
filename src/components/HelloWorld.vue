<template>
  <div id="app" class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div>
      <input type="text" ref="site" v-model="site">
    </div>
    <ul>
      <li>
        <div
          style="cursor:pointer;color: cadetblue;font-weight: 600;"
          @click="() => { $router.push('/maskGoogleMap') }"
        >
          Mask Map
        </div>
      </li>
    </ul>
    <div
      class="MapInfo-map"
      id="map"
    >
    </div>
    <!-- 放評論摘要的div -->
    <!-- <div v-for="(p, idx) in place.reviews" :key='idx'>
      <ul>
        <li>
          <img :src="p.profile_photo_url">
          <div>
            <h5><a target="_blank" :href="p.author_url">{{ p.author_name }}</a></h5>
            <p>{{ p.text }}</p>
            <h6>{{ p.relative_time_description }}</h6>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      site: '',
      autocomplete: null, // google map Autocomplete method
      place: null, // 存place確定後回傳的資料
      loader: new Loader({
        apiKey: 'AIzaSyCi_1BP7ZxpU4YLSfAE5l6tRixKWisW2Bo',
        libraries: ['drawing', 'geometry', 'places', 'visualization'],
        version: 'weekly'
      }),
      googleMap: null,
      msg: 'Welcome to GoogleMap',
      centers: {
        lat: 25.0374865, // 經度
        lng: 121.5647688 // 緯度
      }
    }
  },
  methods: {
    initMap() {
      this.googleMap = new window.google.maps.Map(document.getElementById('map'), {
        center: this.centers,
        zoom: 13
      })
      const position = [
        {label: 'A', lat: 15.0336962, lng: 121.5643673, name: 'asdasd'},
        {label: 'B', lat: 55.0333698, lng: 121.5641564, name: 'asdasd'},
        {label: 'C', lat: 35.033899, lng: 121.564329, name: 'asdasd'},
        {label: 'D', lat: 25.0338407, lng: 121.5645269, name: 'asdasd'},
        {label: 'E', lat: 55.0336377, lng: 121.5645727, name: 'asdasd'}
      ]
      position.forEach((item, idx) => { // 多個圖標
        let marker = new window.google.maps.Marker({
          position: {
            lat: item.lat,
            lng: item.lng
          },
          map: this.googleMap,
          label: item.label,
          animation: window.google.maps.Animation.DROP
        })
        // info window
        let infowindow = new window.google.maps.InfoWindow({
          content: `<h6>${item.name}</h6>` // 支援html
        })
        // 監聽 marker click 事件
        marker.addListener('click', e => {
          infowindow.open(this.googleMap, marker)
        })
      });
      // let marker = new window.google.maps.Marker({  單一圖標
      //   position: { lat: -34.397, lng: 150.644 },
      //   map: this.googleMap
      // })

    },
    siteAuto() {
      let options= {
        componentRestrictions: { country: 'tw' } // 限制在台灣範圍
      };
      this.autocomplete = new window.google.maps.places.Autocomplete(this.$refs.site, options); // google map Autocomplete method
      // 地址的輸入框，值有變動時執行
      this.autocomplete.addListener('place_changed', () => {
        this.place = this.autocomplete.getPlace(); // 地點資料存進place
        console.log(this.place);
      })
      // 確認回來的資料有經緯度
      if(this.place.geometry) {
        // 改變map的中心點
        let searchCenter = this.place.geometry.location;
        // panTo是平滑移動、setCenter是直接改變地圖中心
        this.googleMap.panTo(searchCenter);
        // 在搜尋結果的地點上放置標記
        let marker = new window.google.maps.Marker({
          position: searchCenter,
          map: this.map
        });
        // info window
        let infowindow = new window.google.maps.InfoWindow({
          content: this.place.formatted_address
        });
        infowindow.open(this.map, marker);
      }
    }

  },
  mounted () {
    this.loader.load().then(() => {
      this.initMap();
      this.siteAuto();
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.MapInfo-map {
    align-self: center;
    width: 99%;
    min-width: 320px;
    height: 530px;
    min-height: 230px;
    background: #d8d8d8;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
.test {
    color: aqua;
  }
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
