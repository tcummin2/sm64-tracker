<template>
  <div class="sidebar">
    <div>
      Seed:
      <input class="seed" type="text" />
    </div>
    <style-switcher />
    <div>{{ starCount }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StyleSwitcher from './StyleSwitcher'

export default {
  name: 'Sidebar',
  components: { StyleSwitcher },
  computed: mapGetters(['starCount']),
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 180px;
  border-right: 1px solid white;
  padding: 10px;
}

.seed {
  width: 75px;
}
</style>