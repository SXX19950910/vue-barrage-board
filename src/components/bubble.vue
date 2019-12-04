<template>
  <div ref="item" :class="stateClass" :style="bubbleStyle" @mouseenter="handleMoveIn" @mouseleave="handleMoveOut" @click="handleClick">
    <slot>
      <span :style=textStyle>{{ attr.message }}</span>
    </slot>
  </div>
</template>
<script>
  export default {
    name: 'Bubble',
    props: {
      attr: {
        type: Object,
        default() {
          return {
            message: '',
            color: '#000',
            size: 14,
            loop: false,
            top: '0'
          }
        }
      }
    },
    data() {
      return {
        pause: false,
        stop: false
      }
    },
    mounted() {
      const $el = this.$refs['item']
      $el.addEventListener('animationend', this.handleAnimationEnd)
    },
    computed: {
      stateClass() {
        let result = 'running'
        if (this.stop) result = 'pause'
        else if (this.pause && !this.stop) result = 'pause'
        else if (!this.pause && !this.stop) result = 'running'
        return `${result} bubble-item`
      },
      bubbleStyle() {
        const result = {
          top: `${this.attr.top}px`,
          animationTimingFunction: this.attr.speed || 'linear'
        }
        if (this.attr.loop) result.animationIterationCount = this.attr.loop ? 'infinite' : ''
        return result
      },
      textStyle() {
        return {color: this.attr.color, fontSize: `${this.attr.size}px`}
      }
    },
    methods: {
      handleToggleStop(state) {
        this.stop = state
      },
      handleMoveIn() {
        this.pause = true
      },
      handleMoveOut() {
        this.pause = false
      },
      handleClick() {
        this.$emit('select')
      },
      handleAnimationEnd(el) {
        const $board = document.getElementById('barrage-wrap')
        $board.removeChild(el.target)
        this.$emit('end')
      }
    }
  }
</script>

<style lang="scss">
  .bubble-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    width: max-content;
    color: #333333;
    position: absolute;
    right: 0;
    cursor: pointer;
    animation: bubble-running 4s forwards;

    &.running {
      animation-play-state: running;
    }

    &.pause {
      animation-play-state: paused;
    }

    @keyframes bubble-running {
      0% {
        right: 0;
      }
      100% {
        right: 100vw;
      }
    }
  }
</style>
