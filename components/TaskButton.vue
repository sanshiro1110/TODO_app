<script setup lang="ts">
import { taskStore } from '@/composables/taskStore'

const taskHandleStore = taskStore()
const { removeCheckedTask } = taskHandleStore

interface Props {
  buttonType: string
  isActive: boolean
}
const props = defineProps<Props>()

const handleButton = ():void => {
  if(props.isActive) {
    switch (props.buttonType) {
      case "delete":
      case "complete":
        removeCheckedTask()
        break;
      default:
        break;
    }
  }
}

let btnClass = "btn"
let btnTitle = ""
switch (props.buttonType) {
  case "delete":
    btnClass += " btn_delete"
    btnTitle = "削除"
    break;
  case "complete":
    btnClass += " btn_complete"
    btnTitle = "完了"
    break;
  default:
    break;
}
</script>

<template>
  <button :class="[btnClass, {active: props.isActive}]" @click="handleButton">{{ btnTitle }}</button>
</template>

<style>
.btn {
  border: none;
  color: #FFFFFF;
  width: 86px;
  height: 32px;
  font-size: 15px;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
  pointer-events: none;
  background-color: #DDDDDD;
}

.btn.active {
  pointer-events: initial;
}

.btn.active:hover {
  opacity: 0.7;
}

.btn.active.btn_delete {
  background-color: #F9A8A8;
}

.btn.active.btn_complete {
  background-color: #AFEDE8;
}
</style>
