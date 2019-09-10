<template>
  <div>
    <div>{{ clock }}</div>
    <button v-if="stopped" @click="start">Start</button>
    <button v-else @click="stop">Stop</button>
    <button @click="reset" :disabled="!stopped">Reset</button>
  </div>
</template>

<script>
const zeroPrefix = (num, digit) => (Array(digit).fill('0') + num).slice(-digit)
const formatClock = (hour, min, sec, ms) =>
  `${zeroPrefix(hour, 2)}:${zeroPrefix(min, 2)}:${zeroPrefix(sec, 2)}.${zeroPrefix(ms, 3)}`

const CLOCK_UPDATE_INTERVAL = 10

export default {
  name: 'Timer',
  data() {
    return {
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      interval: null,
      clock: formatClock(0, 0, 0, '000')
    }
  },
  computed: {
    stopped() {
      return !this.timeBegan || this.timeStopped
    }
  },
  methods: {
    start() {
      if (!this.timeStopped) this.timeBegan = new Date()
      if (this.timeStopped) this.stoppedDuration += (new Date() - this.timeStopped)
      this.timeStopped = null
      this.interval = setInterval(this.updateClock, CLOCK_UPDATE_INTERVAL)
    },
    updateClock() {
      var currentTime = new Date()
      var timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
      var hour = timeElapsed.getUTCHours()
      var min = timeElapsed.getUTCMinutes()
      var sec = timeElapsed.getUTCSeconds()
      var ms = timeElapsed.getUTCMilliseconds()

      this.clock = formatClock(hour, min, sec, ms)
    },
    stop() {
      if (!this.timeStopped) {
        this.timeStopped = new Date()
        clearInterval(this.interval)
      }
    },
    reset() {
      clearInterval(this.interval)
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>