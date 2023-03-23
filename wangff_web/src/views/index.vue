<template>
    <div>
        <el-menu 
            :default-active="this.$route.name" 
            class="el-menu-demo" 
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="Epidemic_distribution">
                <span class = "introduce">Epidemic distribution</span>
            </el-menu-item>
            <el-menu-item index="Provinces">
                <span class = "introduce">Provinces</span>
            </el-menu-item>
            
            <el-menu-item index="Vaccine_administration">
                <span class = "introduce">Vaccine administration</span>
            </el-menu-item>
            <el-menu-item index="National_policies">
                <span class = "introduce">National policies</span>
            </el-menu-item>
        </el-menu>
        <div class="line"></div>
        <router-view/>
    </div>
</template>
<script>
export default {
    name: "layout",
    data() {
        return {
            activePage: "Epidemic distribution",
        };
    },
    created() {
        const { name } = this.$route;
        this.activePage = name;
    },
    components: {},
    methods: {
        handleSelect(index, Path) {
            console.log(index, Path);
            this.$router.push({name: index})
        }
    }
}
</script>

<style>
    
</style>