<script setup lang="ts">
import { taskStore } from '@/composables/taskStore'

const taskHandleStore = taskStore()
const { checkedCatgory } = storeToRefs(taskHandleStore)
const { changeCategory } = taskHandleStore

interface Props {
  iconType: string
  title: string
}
const props = defineProps<Props>()

interface iconPass {
  default: string
}
let iconPass = <iconPass>{}
switch (props.iconType) {
  case "listItem":
    iconPass = await import('~/assets/list_icon.svg')
    break;
  case "complete":
    iconPass = await import('~/assets/check_icon.svg')
    break;
  default:
    break;
}

const handleCategoryClick = ():void => {
  changeCategory(props.title)
}
</script>
<template>
  <li class="list_item" v-bind:class="[checkedCatgory == props.title ? 'active' : '']" @click="handleCategoryClick()">
    <img :src="iconPass.default" alt="list icon">
    <p class="category_name">{{ props.title }}</p>
  </li>
</template>

<style scoped>
.list_item {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.list_item:hover, .list_item.active {
  background-color: #CCEFEC;
}


.list_item:not(:last-child) {
  margin-bottom: 6px;
}

.list_item .category_name {
  margin-left: 10px;
}
</style>
