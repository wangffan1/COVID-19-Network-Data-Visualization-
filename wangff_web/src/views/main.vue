<template>
    <div style="border-top: 1px solid #EEE">
        <router-view />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activePage: "Epidemic_distribution"
            };
        },
        created() {
            const { name } = this.$route;
            this.activePage = name;
        },
        components: {},
        watch: {},
        computed: {},
        mounted() {},
        methods: {
            
        }

    }
</script>