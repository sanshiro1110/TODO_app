import { defineStore } from "pinia";

interface TaskList {
  category: string;
  tasks: string[];
}
type checkedTask = string[]

export const taskStore = defineStore(
  "taskHandleStore",
  () => {
    const taskList = ref<TaskList[]>([])
    const checkedCatgory = ref("")
    const checkedTask = ref<checkedTask>([])
    //カテゴリー追加
    const addCategory = (category: string):void => {
      const newCategory: TaskList = {
        category: category,
        tasks: [],
      }
      taskList.value.unshift(newCategory)
      checkedCatgory.value = category
    }
    //カテゴリー変更
    const changeCategory = (category: string):void => {
      checkedCatgory.value = category
    }
    //タスク追加
    const addTask = (task: string):void => {
      const targetIndex = taskList.value.findIndex(item => item.category == checkedCatgory.value)
      taskList.value[targetIndex].tasks. unshift(task)
    }
    //タスクをチェック
    const addCheckedTask = (task: string, isCheck: boolean):void => {
      if(isCheck) {
        checkedTask.value.push(task)
      } else {
        const removeIndex = checkedTask.value.indexOf(task)
        checkedTask.value.splice(removeIndex, 1)
      }
    }
    //チェックしたタスクを削除
    const removeCheckedTask = ():void => {
      const targetIndex = taskList.value.findIndex(item => item.category == checkedCatgory.value)
      const targetTasks = taskList.value[targetIndex].tasks
      const newTasks = targetTasks.filter(task => checkedTask.value.includes(task) == false)
      taskList.value[targetIndex].tasks = newTasks
      checkedTask.value = []
    }
    //カテゴリーを削除
    const removeCategory = ():void => {
      const targetIndex = taskList.value.findIndex(item => item.category == checkedCatgory.value)
      taskList.value.splice(targetIndex, 1)
      checkedCatgory.value = ""
    }

    return { taskList, checkedCatgory, checkedTask, addCategory, changeCategory, addTask, addCheckedTask, removeCheckedTask, removeCategory}
  },
  {
    //セッションに保存
    persist: {
      storage: persistedState.sessionStorage,
    },
  }
);
