<template>
  <header>
    <div class="header_title">TODO管理</div>
  </header>
  <main>
    <div class="container">
      <slot />
    </div>
  </main>
</template>

<style>
body {
  margin: 0;
  color: #464646;
}

h1, h2, h3, h4, h5, h6, p, input {
  margin: 0;
  padding: 0;
}

input[type="text"] {
  border: none;
  outline: none;
  font-size: 14px;
}

ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}

header {
  height: 80px;
  width: 100%;
  background-color: #CCEFEC;
  position: relative;
  display: flex;
  align-items: center;
}

header .header_title {
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
}

main {
  height: calc(100vh - 80px);
}

.container {
  display: flex;
  height: 100%;
}
</style>
