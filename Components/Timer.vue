<template>
  <div>
    <div class="clock">
      <div>{{ clock }}</div>
      <button v-if="stopped" @click="start">
        Start
      </button>
      <button v-else @click="stop">
        Stop
      </button>
      <button :disabled="!stopped" @click="reset">
        Reset
      </button>
    </div>
    <div class="splits">
      <div>
        Split at
        <input v-model.number="splitAt"
          type="number"
          min="1"
          max="120"
          step="1"
        >
        Stars
      </div>
      <div v-for="(split, i) in splits"
        :key="i"
      >
        <span class="num-stars">{{ split.stars }}</span>
        <span class="time-stamp">{{ convertDateObjectToTime(split.timeStamp) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      clock: formatClock(0, 0, 0, '000'),
      splits: [],
      splitAt: 10
    }
  },
  computed: {
    ...mapGetters(['starCount']),
    stopped() {
      return !this.timeBegan || this.timeStopped
    }
  },
  watch: {
    starCount(newValue, oldValue) {
      if (!this.stopped && newValue > oldValue && newValue % this.splitAt === 0) {
        this.splits.push({ timeStamp: this.getElapsedTime(), stars: newValue })
      } else if (oldValue > newValue) {
        this.splits = this.splits.filter(split => split.stars === this.oldValue)
      }
    }
  },
  methods: {
    start() {
      if (!this.timeStopped) this.timeBegan = new Date()
      if (this.timeStopped) this.stoppedDuration += (new Date() - this.timeStopped)
      this.timeStopped = null
      this.interval = setInterval(this.updateClock, CLOCK_UPDATE_INTERVAL)
    },
    convertDateObjectToTime(dateObj) {
      var hour = dateObj.getUTCHours()
      var min = dateObj.getUTCMinutes()
      var sec = dateObj.getUTCSeconds()
      var ms = dateObj.getUTCMilliseconds()

      return formatClock(hour, min, sec, ms)
    },
    getElapsedTime() {
      return new Date(new Date() - this.timeBegan - this.stoppedDuration)
    },
    updateClock() {
      var timeElapsed = this.getElapsedTime()

      this.clock = this.convertDateObjectToTime(timeElapsed)
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