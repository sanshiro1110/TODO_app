<script setup lang="ts">
useHead({
  title: "TODO管理"
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Sidebar />
    <TaskList />
  </NuxtLayout>
</template>
