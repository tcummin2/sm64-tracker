<template>
  <div class="style-switcher">
    <span class="switch-field">
      <label @click="shouldShowImages = !shouldShowImages">Images</label>
      <toggle-button v-model="shouldShowImages"
        :sync="true"
        color="#007bfe"
      />
    </span>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  name: 'StyleSwitcher',
  components: { ToggleButton },
  props: { painting: String },
  computed: {
    ...mapState(['showImages']),
    shouldShowImages: {
      get() { return this.showImages },
      set(value) { this.setShowImages(value) }
    }
  },
  methods: mapActions(['setShowImages'])
}
</script>

<style lang="scss" scoped>
.style-switcher {
  margin: 10px 0;
}

.style, input, label {
  cursor: pointer;
}

.style {
  margin: 0 10px;
}
</style>
