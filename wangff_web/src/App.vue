<template>
  <div id="app">
    <HeadTab />
    <router-view/>
  </div>
</template>

<script>
  import HeadTab from '@/components/head_tab'
  export default {
    data() {
      return {

      }
    },
    components: {
      HeadTab,
    }
  }
</script>


