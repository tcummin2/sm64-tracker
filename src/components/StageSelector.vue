<template>
  <div class="stage-selector"
    :style="style"
  >
    <div class="stage-container">
      <div v-for="defaultStage in stages"
        :key="defaultStage.name"
        class="selectable-stage"
        :class="{
          selected: stage === defaultStage.name,
          taken: selectedStages.includes(defaultStage.name)
        }"
        @click.stop="selectStage(defaultStage.name)"
        @touch.stop="selectStage(defaultStage.name)"
      >
        <span v-if="displayStyle === 'abbreviations'">{{ defaultStage.name }}</span>
        <img v-else :src="require(`../../assets/${defaultStage.name.toLowerCase()}.png`)">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import stages from '../stages.json'

const TOP_OFFSET = 19

export default {
  name: 'StageSelector',
  props: ['focusedPainting', 'coordinates'],
  data() {
    return {
      stages: [].concat(...stages.map(location => location.stages))
    }
  },
  computed: Object.assign(mapGetters(['getStageNameByPainting', 'selectedStages', 'displayStyle']), {
    style() {
      return {
        top: `${this.coordinates.top + TOP_OFFSET + (window.scrollY || window.pageYOffset)}px`,
        left: `${this.coordinates.left + (window.scrollX || window.pageXOffset)}px`
      }
    },
    stage() {
      return this.getStageNameByPainting(this.focusedPainting)
    }
  }),
  methods: Object.assign(mapActions(['assignStage']), {
    selectStage(stage) {
      this.assignStage({
        painting: this.focusedPainting,
        stage: stage
      })
      this.$emit('close')
    }
  })
}
</script>

<style lang="scss" scoped>
.stage-selector {
  position: absolute;
  width: 200px;
  border: 1px solid grey;
  border-radius: 2px;
  color: black;
  background: white;

  .stage-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .selectable-stage {
      margin: 0px 3px;
      cursor: pointer;
      border: 1px solid transparent;
      height: 24px;

      &:hover {
        border: 1px solid grey;
      }

      &.selected {
        color: blue;
      }

      &.taken {
        opacity: 0.5;
      }
    }
  }
}

img {
  height: 24px;
  width: 24px;
}
</style>
