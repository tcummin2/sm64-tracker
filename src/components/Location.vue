<template>
  <div class="location">
    <div>{{ location }}</div>
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
import Stage from './Stage'

export default {
  name: 'Location',
  props: ['location', 'stages'],
  components: { Stage },
  methods: {
    showStageSelector(painting, e) {
      this.$emit('select-stage', painting, e)
    }
  }
}
</script>
