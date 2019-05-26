<template>
  <div id="app"
    @click="closeStageSelector"
    @touch="closeStageSelector"
  >
    <style-switcher />
    <stage v-for="painting in stages"
      :key="painting.name"
      :painting="painting"
      @select-stage="showStageSelector"
    >
      {{ painting.name }}
    </stage>
    <stage-selector v-show="focusedPainting"
      :focusedPainting="focusedPainting"
      :coordinates="stageSelectorCoordinates"
      @close="closeStageSelector" />
  </div>
</template>

<script>
import stages from '../stages.json'
import StyleSwitcher from './StyleSwitcher'
import Stage from './Stage'
import StageSelector from './StageSelector'

export default {
  name: 'App',
  components: { StyleSwitcher, Stage, StageSelector },
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
