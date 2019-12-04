import vueBarrageBoard from './App.vue'
export default vueBarrageBoard
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('barrage-board', vueBarrageBoard)
}
