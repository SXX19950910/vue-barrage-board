import Vue from 'vue'
import App from './App.vue'
import './../src/assets/icon/iconfont.css'
import { Button, Checkbox, Dropdown, Input, Popover, DropdownItem, DropdownMenu } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Dropdown.name, Dropdown)
Vue.component(Input.name, Input)
Vue.component(Popover.name, Popover)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(DropdownMenu.name, DropdownMenu)
import vueBarrageBoard from './App.vue'
export default vueBarrageBoard
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('barrage-board', vueBarrageBoard)
}
