<template>
  <div class="style-switcher">
    <span v-for="style in styles"
      :key="style.type"
      class="style"
    >
      <input type="radio"
        :name="style.type"
        :value="style.type"
        :id="style.type"
        v-model="storeStyle">
      <label :for="style.type">{{ style.label }}</label>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const STYLES = [{
  type: 'image',
  label: 'Images'
}, {
  type: 'abbreviations',
  label: 'Abbreviations'
}]

export default {
  name: 'StyleSwitcher',
  props: ['painting'],
  data() {
    return {
      styles: STYLES
    }
  },
  computed: Object.assign(mapGetters(['displayStyle']), {
    storeStyle: {
      get() { return this.displayStyle },
      set(value) { this.changeDisplayStyle(value) }
    }
  }),
  methods: mapActions(['changeDisplayStyle'])
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
