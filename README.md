# vue-barrage-board

> 简单好用的弹幕板

## 使用方式

``` bash
# install
npm i vue-barrage-board -S
```
#### api
name | describe | params
----|------|-----
insert | 插入一条弹幕进弹幕板  | message,color,size,loop,speed
handleClearScreen | 清屏  | -
handleChangeState | 切换弹幕的状态（行进，暂停）  | true/false
handleToggleLoop | 切换循环状态 | true/false

#### props
name | describe | params
----|------|-----
showToolsBar | 是否显示操作栏  | true/false
theme | 主题  | light/dark

## example
```vue
<template>
  <barrage-board showToolsBar theme="dark" ref="barrage-board" />
</template>
<script>
  import barrageBoard from 'vue-barrage-board'
  export default {
    components: barrageBoard,
    methods: {
      handleInsertBubble() {
        const bubble = {
          message: '弹幕内容', // 消息文本
          size: 20, // 字体大小
          color: '#000', // 字体颜色
          speed: 'linear', // ease ease-in ease-out ease-in-out
          loop: true // 是否循环
        }       
        this.$refs['barrage-board'].insert(bubble)
      }     
    }   
  }
</script>
```
