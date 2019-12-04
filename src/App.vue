<template>
  <div id="barrage-board-wrap">
    <yl-barrage ref="barrage" :class="barrageClass"/>
    <div v-if="showToolsBar" class="bottom-area" :class="toolsClass">
      <div class="handle-box">
        <el-popover
          v-model="colorVisible"
          placement="top-start"
          trigger="click"
        >
          <div class="theme-popper">
            <div class="title">弹幕颜色</div>
            <div class="color-list">
              <div v-for="(item, index) in colorList" :key="index" class="item" :style="{backgroundColor: item.color}" @click="handleSelectColor(item.color)" />
            </div>
          </div>
          <div slot="reference" class="theme-picker" :style="{backgroundColor: currentColor}">A</div>
        </el-popover>
        <el-dropdown placement="top" trigger="click">
          <span class="el-dropdown-link">
            <i class="iconfont icon-font-size" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in sizeList" :key="index" :disabled="item.size === currentSize" @click.native="handleSelectSize(item.size)">{{ item.size }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="icon-shanchu iconfont clear-btn" @click="handleClearScreen"></span>
        <span :class="isStop ? 'iconfont icon-bofangzanting1' : 'iconfont icon-bofangzanting'" class="state-btn" @click="handleToggleState"></span>
        <el-checkbox v-model="isLoop" class="ml-15" @change="handleToggleLoop">循环</el-checkbox>
        <el-dropdown placement="top" trigger="click">
          <span class="el-dropdown-link">
            <i class="iconfont icon-jijian ml-15 speed-btn" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in speedList" :key="index" :disabled="item.value === currentSpeed" @click.native="handleChangeSpeed(item.value)">{{ item.text }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="message-box">
        <el-input size="small" v-model="text" class="mr-20" @keydown.native.enter="handleSubmit" />
        <el-button size="small" type="primary" @click="handleSubmit">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ylBarrage from './components/index.vue'
  export default {
    props: {
      showToolsBar: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        default: 'light'
      }
    },
    components: {
      ylBarrage
    },
    data() {
      return {
        loading: true,
        text: '',
        currentColor: '#F5222D',
        currentSize: '24',
        colorVisible: false,
        currentSpeed: 'linear',
        isStop: false,
        isLoop: false,
        speedList: [
          {
            text: '匀速',
            value: 'linear'
          },
          {
            text: '快-慢',
            value: 'ease-out'
          },
          {
            text: '慢-快',
            value: 'ease-in'
          },
          {
            text: '慢-快-慢',
            value: 'ease-in-out'
          },
          {
            text: '步进',
            value: 'ease'
          }
        ],
        colorList: [
          {
            color: '#1890FF'
          },
          {
            color: '#F5222D'
          },
          {
            color: '#FA541C'
          },
          {
            color: '#FAAD14'
          },
          {
            color: '#13C2C2'
          },
          {
            color: '#52C41A'
          },
          {
            color: '#2F54EB'
          },
          {
            color: '#722ED1'
          }
        ],
        sizeList: [
          {
            size: '24'
          },
          {
            size: '20'
          },
          {
            size: '18'
          },
          {
            size: '16'
          },
          {
            size: '14'
          },
          {
            size: '12'
          }
        ]
      }
    },
    computed: {
      barrageClass() {
        return this.theme === 'light' ? 'light-barrage' : 'dark-barrage'
      },
      toolsClass() {
        return this.theme === 'light' ? 'light-tools' : 'dark-tools'
      }
    },
    methods: {
      insert({ message, color, size, loop, speed }) {
        this.$refs['barrage'].insert({ message, color, size, loop, speed })
      },
      handleSubmit() {
        this.$refs['barrage'].insert({ message: this.text, color: this.currentColor, size: this.currentSize })
        this.text = ''
      },
      handleSelectColor(color) {
        this.currentColor = color
        this.$nextTick(() => {
          this.colorVisible = false
        })
      },
      handleSelectSize(size) {
        this.currentSize = size
      },
      handleClearScreen() {
        const $barrage = this.$refs['barrage']
        $barrage && $barrage.clearScreen()
      },
      handleChangeState(state) {
        const $barrage = this.$refs['barrage']
        if (typeof state === 'boolean') {
          if (state) $barrage.play()
          else $barrage.stop()
        } else {
          console.error('state type must boolean')
        }
      },
      handleToggleState() {
        const $barrage = this.$refs['barrage']
        if (this.isStop) {
          $barrage.play()
          this.isStop = false
        } else {
          $barrage.pause()
          this.isStop = true
        }
      },
      handleToggleLoop(value) {
        const $barrage = this.$refs['barrage']
        $barrage.handleToggleLoop(value)
      },
      handleChangeSpeed(value) {
        this.currentSpeed = value
        const $barrage = this.$refs['barrage']
        $barrage.handleChangeSpeed(value)
      }
    }
  }
</script>

<style lang="scss">
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .theme-popper {
    .title {
      font-size: 12px;
    }
    .color-list {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin-right: 15px;
        margin-top: 15px;
        border: 2px solid transparent;
        cursor: pointer;
        transition: .4s ease all;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
  #barrage-board-wrap {
    .ml-15 {
      margin-left: 15px;
    }
    .mr-20 {
      margin-right: 20px;
    }
    #barrage-wrap {
      &.light-barrage {
        background-color: #F5F5F5;
      }
      &.dark-barrage {
        background-color: #2B3139;
      }
    }
    .bottom-area {
      position: fixed;
      width: 100%;
      bottom: 0;
      padding: 20px;
      &.light-tools {
        background-color: #F5F5F5;
      }
      &.dark-tools {
        background-color: #2B3139;
      }
      .handle-box {
        padding: 20px 0;
        display: flex;
        align-items: center;
        .theme-picker {
          width: 20px;
          height: 20px;
          border-radius: 100%;
          background-color: #0a76a4;
          text-align: center;
          font-size: 12px;
          color: white;
          line-height: 20px;
          cursor: pointer;
          transition: .4s ease background-color;
          margin-right: 15px;
        }
        .icon-font-size {
          font-size: 16px;
        }
      }
      .clear-btn {
        font-size: 14px;
        margin-left: 15px;
        cursor: pointer;
        color: #909399;
        &:hover {
        }
      }
      .state-btn {
        font-size: 16px;
        margin-left: 15px;
        cursor: pointer;
        color: #909399;
        &:hover {
        }
      }
      .speed-btn {
        @extend .state-btn;
        color: #909399;
      }
      .message-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        overflow: hidden;
        .el-input {
          width: 100%;
        }
      }
    }
  }
</style>
