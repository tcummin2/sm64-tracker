<template>
  <div class="star-category">
    <img v-for="(star, i) in stars"
      :key="i"
      class="star"
      :class="{ selected: isSelected(i) }"
      :src="require(`../assets/${fileName}`)"
      @click="toggle(i)"
      @touch="toggle(i)"
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'StarCategory',
  props: {
    category: String,
    stageName: String
  },
  computed: {
    ...mapGetters(['getStarsByCategoryByStage']),
    stars() {
      return this.getStarsByCategoryByStage(this.stageName, this.category)
    },
    fileName() {
      return {
        redCoins: 'redcoin.png',
        loose: 'star.png',
        hundredCoins: 'yellowcoin.png',
        box: 'box.png',
        other: 'star.png',
        toad: 'toad.png',
        mips: 'mips.png'
      }[this.category]
    }
  },
  methods: {
    ...mapActions(['toggleStar']),
    toggle(i) {
      this.toggleStar({
        stageName: this.stageName,
        category: this.category,
        starIndex: i
      })
    },
    isSelected(i) {
      return !!this.stars[i]
    }
  }
}
</script>

<style lang="scss" scoped>
.star-category {
  display: inline-block;
  margin: 0px 5px;
  vertical-align: middle;
}

img {
  height: 16px;
}

.star {
  cursor: pointer;
  opacity: 0.5;

  &.selected {
    opacity: 1.0
  }
}
</style>
