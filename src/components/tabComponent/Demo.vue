<template lang="html">
  <div>
    <div class='wrapper'>
      <button class='change__style' @click='changeStyle()'>Change Style</button>
      <Tabs :mode="mode" @childemit="changeTab">
        <Tab title="Tab 1">Hello From Tab 1</Tab>
        <Tab title="Tab 2">Hello From Tab 2</Tab>
        <Tab title="Tab 3">Hello From Tab 3</Tab>
        <Tab title="Tab 4">Hello From Tab 4</Tab>
      </Tabs>
      <DemoChild
        v-if="activeTab === 0"
      >

      </DemoChild>
      <DemoChild0
        v-if="activeTab === 1"
      >

      </DemoChild0>
    </div>
  </div>
  
</template>

<script>
import DemoChild from './DemoChild'
import DemoChild0 from './DemoChild0'
import Tab from './Tab'
import Tabs from './Tabs'

export default {
  name: 'Demo',
  components: {
    Tab,
    Tabs,
    DemoChild,
    DemoChild0
  },
  props: {
    tabIndex: {
      Type: Boolean,
      default: 0,
    },
  },
  watch: {
    tabIndex() {
      this.activeTab = this.tabIndex;
    }
  },
  data () {
    return {
      mode: 'dark',
      activeTab: this.tabIndex,
    }
  },
  methods: {
    changeStyle () {
      if (this.mode === 'dark') {
        this.mode = 'light'
      } else {
        this.mode = 'dark'
      }
    },
    changeTab (idx) {
      if (this.$router.history.current.path !== '/HelloWorld/demo' && idx === 0) {
        this.activeTab = idx;
        this.$router.push('/HelloWorld/demo');
      }
      if (this.$router.history.current.path !== '/HelloWorld/demo2' && idx === 1) {
        this.activeTab = idx;
        this.$router.push('/HelloWorld/demo2');
      }
    }
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    font-family: 'Karla', sans-serif;
  }
  .wrapper {
    width: 100%;
    min-height: 100vh;
    background-color: #f8f8f8;
    margin: 0;
    padding: 20px;
  }

  .change__style {
    background-color: #eee;
    font-size: 1em;
    margin-bottom: 10px;
    padding: 5px;
  }
</style>
