<template>
  <div id="barrage-wrap" ref="container">
    <bubble v-for="(item, index) in list" ref="bubble" :key="index" :attr="item" @select="onSelect" @end="onEnd">
      <slot />
    </bubble>
  </div>
</template>

<script>
  import bubble from './bubble'
  export default {
    name: 'Barrage',
    components: {
      bubble
    },
    data() {
      return {
        list: [],
        loop: false,
        speed: 'linear'
      }
    },
    computed: {
    },
    methods: {
      init() {
        this.list = []
      },
      check(message) {
        let result = true
        if (!message) {
          console.error('no message')
          result = false
        }
        return result
      },
      insert({ message, color, size, loop = this.loop, speed = this.speed }) {
        if (!this.check(message)) return
        const distanceEdge = 30
        const $container = this.$refs['container']
        const containerHeight = $container.offsetHeight
        const computedTop = Math.round(Math.random() * containerHeight) - distanceEdge
        const top = computedTop <= 0 ? 20 : computedTop
        const bubble = { size, message, color, top, loop, speed }
        this.list.push(bubble)
      },
      clearScreen() {
        this.list = []
      },
      pause() {
        const $bubbleList = this.$refs['bubble']
        if (!$bubbleList || $bubbleList.length <= 0) return
        $bubbleList.map(item => { item.handleToggleStop(true) })
      },
      play() {
        const $bubbleList = this.$refs['bubble']
        if (!$bubbleList || $bubbleList.length <= 0) return
        $bubbleList.map(item => { item.handleToggleStop(false) })
      },
      handleChangeSpeed(speed) {
        this.speed = speed
      },
      handleToggleLoop(state) {
        if (typeof state === 'boolean') {
          this.loop = state
          this.list.map(item => { item.loop = state })
        } else {
          this.loop = !this.loop
          this.list.map(item => { item.loop = this.loop })
        }
      },
      onSelect() {
        this.$emit('select')
      },
      onEnd() {
        this.$emit('end')
      }
    }
  }
</script>

<style lang="scss">
  #barrage-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: calc(100vh - 132px);
    overflow: hidden;
  }
</style>
