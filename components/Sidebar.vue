<script setup lang="ts">
import { taskStore } from '@/composables/taskStore'

const taskHandleStore = taskStore()
const { taskList } = storeToRefs(taskHandleStore)
const { addCategory } = taskHandleStore

const inputValue = ref('')
const isSidebarOpen = ref(true)
const handleEnter = ():void => {
  if(inputValue.value.trim() !== "") {
    addCategory(inputValue.value)
    inputValue.value = ""
  }
}

const toggleSidebar = ():void => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div id="sidebar" :class="[!isSidebarOpen ? 'isClose' : '', 'sidebar']">
    <div class="user_category_area">
      <div class="new_category">
        <span class="plus_icon"></span>
        <input type="text" name="add_category" placeholder="新しいカテゴリーを追加" v-model="inputValue" @keydown.enter="handleEnter">
      </div>
      <ul class="list_category">
        <CategoryItem v-for="task in taskList" iconType="listItem" :title="task.category" />
      </ul>
    </div>
    <div class="toggle_btn" @click="toggleSidebar"></div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 30%;
  height: 100%;
  border-right: 1px solid #B0AAAA;
  position: relative;
  transition: all 0.3s;
}

.sidebar.isClose {
  width: 50px;
}

.user_category_area {
  padding: 30px;
  white-space: nowrap;
}

.isClose .user_category_area {
  opacity: 0;
  visibility: hidden;
}

.new_category {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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

input[name="add_category"] {
  width: 200px;
  margin-left: 10px;
}

.defult_category_area {
  padding: 30px;
}

.toggle_btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}

.toggle_btn::before{
  content: "";
  left: 3px;
  width: 10px;
  height: 10px;
  border-top: 4px solid #464646;
  border-right: 4px solid #464646;
  transform: rotate(-135deg);
  transition: all 0.3s;
  display: block;
}

.isClose .toggle_btn::before {
  transform: rotate(45deg)
}
</style>
