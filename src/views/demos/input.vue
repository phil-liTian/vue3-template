<template>
  <div>
    <p-input v-model:value="inputVal" />

    <p-input class="my-10" v-model:value="inputVal" valueType="price" placeholder="price" />
    
    <p-input v-model:value="inputVal" valueType="number" placeholder="number" />

    <p-input class="my-10" v-model:value="inputVal" valueType="code" placeholder="字母+数字 + 下划线" />

    <p-input v-model:value="inputVal" valueType='charOrNum' placeholder="字母 + 数字" />
  </div>
</template>
  
<script lang='ts' setup>
  import { ref } from 'vue';

  const inputVal = ref('')
</script>
  
<style lang='less' scoped>
  
</style>