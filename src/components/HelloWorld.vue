<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          class="test"
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <div
      class="MapInfo-map"
      id="map"
    >
    </div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'

export default {
  name: 'HelloWorld',
  data () {
    return {
      loader: new Loader({
        apiKey: 'AIzaSyCi_1BP7ZxpU4YLSfAE5l6tRixKWisW2Bo',
        version: 'weekly'
      }),
      googleMap: null,
      msg: 'Welcome to Your Vue.js Appsadas',
      centers: {
        lat: 25.0374865, // 經度
        lng: 121.5647688 // 緯度
      }
    }
  },
  mounted () {
    this.loader.load().then(() => {
      this.googleMap = new window.google.maps.Map(document.getElementById('map'), {
        center: this.centers,
        zoom: 13
      })
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.MapInfo-map {
    align-self: center;
    width: 99%;
    min-width: 320px;
    height: 230px;
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
