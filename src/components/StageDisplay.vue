<template>
  <div class="painting-name">
    <label class="image-container"
      :class="{ 'true-stage': isTrueStage }"
    >
      <span v-if="!stageName || !showImages"
        :class="{ completed: isCompleted }"
      >
        {{ stageName || '&nbsp;' }}
      </span>
      <img v-else
        :src="require(`../../assets/${stageName.toLowerCase()}.png`)"
        :class="{ completed: isCompleted }">
      <img v-if="isCompleted"
        :src="require('../../assets/checkmark.svg')"
        class="checkmark">
    </label>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'StageDisplay',
  props: ['stageName', 'leadsTo', 'isTrueStage'],
  computed: {
    ...mapGetters(['isStageComplete']),
    ...mapState(['showImages']),
    isCompleted() {
      return this.isStageComplete(this.leadsTo)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 24px;
  width: 24px;
  vertical-align: middle;
}

.painting-name {
  margin-right: 5px;
  grid-column: 1;
  -ms-grid-column: 1;
  text-align: right;
  margin: auto;
  display: inline-block;
  padding: 0px 10px;

  .images & {
    text-align: center;
  }
}

.image-container {
  position: relative;
  display: inline-block;
}

.completed {
  opacity: 0.5
}

.true-stage {
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  pointer-events: none;
}
</style>
