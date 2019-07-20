<template>
  <div class="stage" :class="{ images: displayStyle === 'image' }">
    <stage-display
      :stageName="painting.name"
      :leadsTo="stageName" />
    <div class="arrow">=></div>
    <div class="stage-name"
      :class="{ empty: !stageName }"
      @click.stop="selectStage"
      @touch.stop="selectStage"
    >
      <stage-display :stageName="stageName" :isTrueStage="true" />
    </div>
    <div v-if="stageName" class="stage-stars">
      <star-category v-for="category in starCategories"
        :key="category"
        :stageName="stageName"
        :category="category" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StarCategory from './StarCategory'
import StageDisplay from './StageDisplay'

export default {
  name: 'Stage',
  props: ['painting'],
  components: { StarCategory, StageDisplay },
  computed: {
    ...mapGetters(['getStageNameByPainting', 'getStarsByStage', 'displayStyle']),
    stageName() {
      return this.getStageNameByPainting(this.painting.name)
    },
    stars() {
      return this.getStarsByStage(this.stageName)
    },
    starCategories() {
      return Object.keys(this.stars)
    }
  },
  methods: {
    selectStage(e) {
      this.$emit('select-stage', this.painting, e)
    }
  }
}
</script>

<style lang="scss" scoped>
.stage {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 75px 65px 75px auto;
  grid-template-columns: 75px 65px 75px auto;
  text-align: center;
  height: 30px;
  width: 380px;

  &.images {
    -ms-grid-columns: 75px 65px 75px auto;
    grid-template-columns: 75px 65px 75px auto;
  }
}

.arrow {
  grid-column: 2;
  -ms-grid-column: 2;
  margin: auto;
}

.stage-name {
  display: inline-block;
  width: 67px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  grid-column: 3;
  -ms-grid-column: 3;

  &.empty {
    border: 1px solid white;
  }
}

.stage-stars {
  text-align: left;
  grid-column: 4;
  -ms-grid-column: 4;
  display: block;
  margin: auto 0;
}
</style>
