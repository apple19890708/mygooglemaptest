<template>
  <div id="app">
    <div class="row no-gutters">
      <!-- 選擇所在區域 -->
      <div class="toolbox col-sm-3 p-2 bg-white">
        <div class="form-group d-flex">
          <label for="cityName" class="col-form-label mr-2 text-right">縣市</label>
          <div class="flex-fill">
            <select id="cityName" class="form-control" v-model="select.city">
                <option value="">請選擇縣市</option>
                <option :value="c.CityName" v-for="c in cityName" :key="c.CityName">
                {{ c.CityName }}
                </option>
            </select>
          </div>
        </div>
        <div class="form-group d-flex">
          <label for="area" class="col-form-label mr-2 text-right">地區</label>
          <div class="flex-fill">
            <select id="area" class="form-control" v-model="select.area">
							<option value="">請選擇地區</option>
							<option :value="a.AreaName" v-for="a in cityName.find((city) => city.CityName === select.city).AreaList" :key="a.AreaName">
								{{ a.AreaName }}
							</option>
						</select>
          </div>
        </div>
      </div>

      <!-- 顯示藥局位置 -->
      <div class="col-sm-9">
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
	#map {
		position: relative;
		height: 100vh;
	}
</style>

<script>
import cityName from '../assets/cityName.json' // 城市與鄉鎮資料
import axios from 'axios'
const api = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
import L from 'leaflet'
let openStreetMap = {};

export default {
  name: 'maskGoogleMap',
  data () {
    return {
      cityName: cityName || [],
      select: {
        city: '臺北市',
      	area: ''
      },
      baseData: [],
    }
  },
  methods:{
    updateMap() {
      // clear markers
      openStreetMap.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          openStreetMap.removeLayer(layer);
        }
      });
      // add markers
      this.pharmacies.forEach((item) => {
        L.marker([
          item.geometry.coordinates[1],
          item.geometry.coordinates[0],
        ]).addTo(openStreetMap).bindPopup(`<p><strong style="font-size: 20px;">${item.properties.name}</strong></p>
          <strong style="font-size: 16px; color: #d45345;">口罩剩餘：成人 - ${item.properties.mask_adult ? `${item.properties.mask_adult} 個` : '未取得資料'} / 兒童 - ${item.properties.mask_child ? `${item.properties.mask_child} 個` : '未取得資料'}</strong><br>
          地址: ${item.properties.address}<br>
          電話: ${item.properties.phone}<br>
          <small>最後更新時間: ${item.properties.updated}</small>`);;
      });
    },
  },
  computed: {
    pharmacies() {
      return this.baseData.filter((item) => {
        if(!this.select.area) {   // 如果還沒有地區 就先撈城市
          return item.properties.county === this.select.city;
        }
        return (item.properties.town === this.select.area && item.properties.county === this.select.city); // 有地區 就必須兩個條件都符合
      })
    }
  },
  watch: {
    pharmacies(value) {
      this.updateMap();
    },
    'select.city'() {
      this.select.area = '';  // 也可以在input 用 @change做動作
    }
  },
  mounted() {
    openStreetMap = L.map('map', {
      center: [25.042474, 121.513729],
      zoom: 18,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
    }).addTo(openStreetMap);
  },
  async created() {
      try {
        const res = await axios.get(api)
        this.baseData = res.data.features;
        console.log(res);
      } catch(error) {
        console.log(error.response);
      }
  },
}
</script>
