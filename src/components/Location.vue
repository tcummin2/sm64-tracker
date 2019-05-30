<template>
  <div class="location">
    <div>
      <span>{{ name }}</span>
      <star-category v-for="category in starCategories"
        :key="category"
        :stageName="name"
        :category="category" />
    </div>
    <stage v-for="painting in stages"
      :key="painting.name"
      :painting="painting"
      @select-stage="showStageSelector"
    >
      {{ painting.name }}
    </stage>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Stage from './Stage'
import StarCategory from './StarCategory'

export default {
  name: 'Location',
  props: ['name', 'stages'],
  components: { Stage, StarCategory },
  computed: { ...mapGetters(['getStarsByStage']),
    starCategories() {
      return Object.keys(this.getStarsByStage(this.name) || {})
    }
  },
  methods: {
    showStageSelector(painting, e) {
      this.$emit('select-stage', painting, e)
    }
  }
}
</script>
