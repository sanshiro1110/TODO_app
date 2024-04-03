<script setup lang="ts">
import { taskStore } from '@/composables/taskStore'

const taskHandleStore = taskStore()
const { checkedTask } = storeToRefs(taskHandleStore)
const { addTask } = taskHandleStore
const { addCheckedTask } = taskHandleStore

interface Props {
  itemType: string
  content: string
}
const props = defineProps<Props>()
const inputValue = ref('')
const inputCheck = ref(false)

const handleCheckbox = (): void => {
  addCheckedTask(props.content, inputCheck.value)
}
const handleEnter = (): void => {
  if(inputValue.value.trim() !== "") {
    addTask(inputValue.value)
    inputValue.value = ""
  }
}

const isChecked = computed(():boolean => {
  return checkedTask.value.includes(props.content)
})
</script>

<template>
  <li v-if="props.itemType=='addTask'" class="task_item add_task">
    <span class="plus_icon"></span>
    <input type="text" name="add_input" :placeholder="props.content" v-model="inputValue" @keydown.enter="handleEnter">
  </li>
  <li v-else-if="props.itemType=='taskItem'" class="task_item">
    <input type="checkbox" name="check_btn" v-model="inputCheck" @change="handleCheckbox" :checked="isChecked">
    <p class="task_text">{{ props.content }}</p>
  </li>
</template>

<style scoped>
.task_item {
  height: 40px;
  padding: 6px 20px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.task_item:not(:last-child) {
  margin-bottom: 15px;
}

input[name="add_input"] {
  width: 100%;
  margin-left: 20px;
  border: none;
  color: #464646;
}

.task_text {
  margin-left: 20px;
}

.add_task .task_text {
  color: #7EE7DE;
}

input[name="check_btn"] {
  width: 20px;
  height: 20px;
  accent-color: #7EE7DE;
}

.plus_icon {
  display: inline-block;
  vertical-align: middle;
  color: #7EE7DE;
  line-height: 1;
  width: 1em;
  height: 0.1em;
  background: currentColor;
  border-radius: 0.1em;
  position: relative;
}

.plus_icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  transform: rotate(90deg);
}
</style>
