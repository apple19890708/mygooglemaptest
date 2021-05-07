<template>
  <div>
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';

export default {
  mounted() {
  },
  components: {
    NavBar,
  },
  computed: {
  },
};
</script>
