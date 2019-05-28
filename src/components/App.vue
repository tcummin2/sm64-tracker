<template>
  <div id="app"
    @click="closeStageSelector"
    @touch="closeStageSelector"
  >
    <style-switcher />
    <location v-for="location in stages"
      :key="location.location"
      :location="location.location"
      :stages="location.stages"
      @select-stage="showStageSelector" />
    <stage-selector v-show="focusedPainting"
      :focusedPainting="focusedPainting"
      :coordinates="stageSelectorCoordinates"
      @close="closeStageSelector" />
  </div>
</template>

<script>
import stages from '../stages.json'
import StyleSwitcher from './StyleSwitcher'
import StageSelector from './StageSelector'
import Location from './Location'

export default {
  name: 'App',
  components: { StyleSwitcher, Location, StageSelector },
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
