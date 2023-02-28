<template>
    <div>
        <router-view/>
        <el-menu :default-active="activeIndex" 
            class="el-menu-demo" 
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="1">疫情分布</el-menu-item>
            <el-menu-item index="2">各省情况</el-menu-item>
            
            <el-menu-item index="3">疫苗管理</el-menu-item>
            <el-menu-item index="4">各国政策</el-menu-item>
        </el-menu>
        <div class="line"></div>
    </div>
</template>
<script>
export default {
    name: "layout",
    data() {
        return {
            activeIndex: '1',
        };
    },
    components: {},
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>

</style>