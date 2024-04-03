<script setup lang="ts">
import { taskStore } from '@/composables/taskStore'

type tasks = string[]
const taskHandleStore = taskStore()
const { taskList } = storeToRefs(taskHandleStore)
const { checkedCatgory } = storeToRefs(taskHandleStore)
const { checkedTask } = storeToRefs(taskHandleStore)
const { removeCategory } = taskHandleStore
const targetTask = computed(():tasks => {
  const targetIndex = taskList.value.findIndex(item => item.category == checkedCatgory.value)
  return taskList.value[targetIndex].tasks
})

const deleteCategory = ():void => {
  removeCategory()
}
</script>

<template>
  <div class="task_area">
    <div v-if="checkedCatgory" class="task_box">
      <div class="category_top">
        <p class="title">{{ checkedCatgory }}</p>
        <p class="delete_category" @click="deleteCategory">カテゴリーを削除</p>
      </div>
      <ul class="task_list">
        <TaskItem itemType="addTask" content="タスクの追加" />
        <TaskItem v-for="task in targetTask" itemType="taskItem" :content="task" />
      </ul>
      <div class="btn_area">
        <TaskButton buttonType="delete" :isActive="checkedTask.length ? true : false" />
        <TaskButton buttonType="complete" :isActive="checkedTask.length ? true : false" />
      </div>
    </div>
    <div v-else class="no_category">
      <p class="title">カテゴリーを追加、または選択してください。</p>
    </div>
  </div>
</template>

<style scoped>
.task_area {
  padding-top: 50px;
  width: 100%;
  margin: 0 auto;
}

.task_box {
  width: 80%;
  margin: 0 auto;
}

.task_list {
  margin-bottom: 30px;
}

.category_top {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category_top .title {
  font-size: 20px;
  font-weight: bold;
}

.delete_category {
  font-size: 13px;
  color: #FB4444;
  transition: all 0.3s;
  cursor: pointer;
}

.delete_category:hover {
  opacity: 0.7;
  text-decoration: underline #FB4444;
}

.btn_area {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.no_category {
  width: 80%;
  margin: 0 auto;
}

.no_category .title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}


</style>
