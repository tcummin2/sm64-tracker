<template>
  <div id="app"
    @click="closeStageSelector"
    @touch="closeStageSelector"
  >
    <sidebar />
    <div class="stages">
      <location v-for="location in stages"
        :key="location.name"
        :name="location.name"
        :stages="location.stages"
        @select-stage="showStageSelector" />
      <stage-selector v-show="focusedPainting"
        :focusedPainting="focusedPainting"
        :coordinates="stageSelectorCoordinates"
        @close="closeStageSelector" />
      <paths />
    </div>
  </div>
</template>

<script>
import stages from '../stages.json'
import StageSelector from './StageSelector'
import Location from './Location'
import Paths from './Paths'
import Sidebar from './Sidebar'

export default {
  name: 'App',
  components: { Location, StageSelector, Paths, Sidebar },
  data() {
    return {
      stages: stages,
      stageSelectorCoordinates: {},
      focusedPainting: '',
    }
  },
  methods: {
    showStageSelector(painting, e) {
      this.focusedPainting = painting.name
      this.stageSelectorCoordinates = e.target.getBoundingClientRect()
    },
    closeStageSelector() {
      this.focusedPainting = ''
      this.stageSelectorCoordinates = {}
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  height: 100vh;
}
.stages {
  display: flex;
  flex-direction: column;
  height: 90vh;
  flex-wrap: wrap;
}
</style>
