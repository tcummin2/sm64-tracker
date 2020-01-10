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
        @select-stage="showStageSelector"
      />
      <stage-selector v-show="focusedPainting"
        :focusedPainting="focusedPainting"
        :coordinates="stageSelectorCoordinates"
        @close="closeStageSelector"
      />
      <paths />
    </div>
  </div>
</template>

<script>
import stages from '../Config/stages.json'
import StageSelector from '../Components/StageSelector'
import Location from '../Components/Location'
import Paths from '../Components/Paths'
import Sidebar from '../Components/Sidebar'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { Location, StageSelector, Paths, Sidebar },
  data() {
    return {
      stages: stages,
      stageSelectorCoordinates: {},
      focusedPainting: ''
    }
  },
  mounted() {
    this.resetState()
  },
  methods: {
    ...mapActions(['resetState']),
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

