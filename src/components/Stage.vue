<template>
  <div class="stage">
    <div class="painting-name">
      <span v-if="displayStyle === 'abbreviations'">{{ painting.name }}</span>
      <img v-else :src="require(`../../assets/${painting.name.toLowerCase()}.png`)">
    </div>
    <div class="stage-name"
      @click.stop="selectStage"
      @touch.stop="selectStage"
    >
        <span v-if="!stageName || displayStyle === 'abbreviations'">{{ stageName || '&nbsp;' }}</span>
        <img v-else :src="require(`../../assets/${stageName.toLowerCase()}.png`)">
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

export default {
  name: 'Stage',
  props: ['painting'],
  components: { StarCategory },
  computed: Object.assign(mapGetters(['getStageNameByPainting', 'getStarsByStage', 'displayStyle']), {
    stageName() {
      return this.getStageNameByPainting(this.painting.name)
    },
    stars() {
      return this.getStarsByStage(this.stageName)
    },
    starCategories() {
      return Object.keys(this.stars)
    }
  }),
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
  -ms-grid-columns: 75px 75px auto;
  grid-template-columns: 75px 75px auto;
}

.painting-name {
  margin-right: 5px;
  grid-column: 1;
  -ms-grid-column: 1;
}

.stage-name {
  display: inline-block;
  width: 67px;
  border: 1px solid white;
  text-align: center;
  cursor: pointer;
  grid-column: 2;
  -ms-grid-column: 2;
}

.stage-stars {
  grid-column: 3;
  -ms-grid-column: 3;
  display: block;
}

img {
  height: 24px;
  width: 24px;
}
</style>
