<template>
  <span>
    <ul style="width:200px">
      <li>
        <div
          :class="{isActive: tabIndex == 0}"
          style="cursor:pointer;color: cadetblue;font-weight: 600;"
          @click="() => { $router.push('/HelloWorld'); tabIndex = 0 }"
        >
          checkout to google Map
        </div>
      </li>
      <li>
        <div
          :class="{isActive: tabIndex == 1}"
          style="cursor:pointer;color: cadetblue;font-weight: 600;"
          @click="() => { $router.push('/maskGoogleMap'); tabIndex = 1 }"
        >
          checkout to mask Map
        </div>
      </li>
    </ul>
  </span>
</template>

<style lang="scss" scoped>
  .isActive {
    background-color: burlywood;
  }
</style>

<script>
export default {
  name: 'NavBar',
  components: {

  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>
