<template>
  <div class="sidebar">
    <div>
      Seed:
      <input class="seed" type="text">
    </div>
    <style-switcher />
    <div>
      Stars: {{ starCount }}
    </div>
    <timer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StyleSwitcher from './StyleSwitcher'
import Timer from './Timer'

export default {
  name: 'Sidebar',
  components: { StyleSwitcher, Timer },
  computed: mapGetters(['starCount'])
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 180px;
  border-right: 1px solid white;
  padding: 10px;
  text-align: center;
}

.seed {
  width: 75px;
}
</style>