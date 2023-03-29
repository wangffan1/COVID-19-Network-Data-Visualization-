<template>
    <div id = "epic_distribution">
        <input type="file" @change="handleFile">
        <div ref="piechart" style="height: 400px; width: auto; align-items: center;"></div>
        <!-- <pre>{{ sheetData }}</pre> -->
    </div>
</template>
<script>
import *  as XLSX from 'xlsx';
import iconv from 'iconv-lite';
import * as echarts from 'echarts';

export default {
    data() {
        return {
            sheetData: [],
            chartData: [],
            pieProvince: [],
        }
    },
    watch: {
        sheetData() {
            if(this.sheetData.length != 0) {
                this.renderChart();
            }
        }
    },
    mounted() {
        
    },
    methods: {
        handleFile(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header:1 });
                this.sheetData = sheetData;
                this.dataClassify(sheetData);
                
            };
            reader.readAsBinaryString(file);   

        },
        renderChart() {
            const pieChart = echarts.init(this.$refs.piechart);
            const option = {
                title : {
                    text: '全国各省确诊病例数',
                    x: 'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    top: '20%',
                    right: '30%',
                    data: this.pieProvince,
                },
                // grid: {
                //     left: '100px',  // 将左边距设置为 100 像素
                //     right: 'center'
                // },

                series : [
                    {
                        //name: '饼图示例',
                        type: 'pie',
                        radius : '65%',
                        center: ['40%', '60%'],
                        data: this.chartData,
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(1, 1, 100, 0.5)'
                            }
                        }
                    }
                ]
            };
            pieChart.setOption(option);
            console.log("111")
        },
        dataClassify(data) {
            var province_data = {};
            var id = 0;
            data.forEach(function(item, key) {
                if (key > 0) {
                    if (province_data[item[2]] == undefined) {
                        province_data[item[2]] = item[3];
                    } else {
                        province_data[item[2]] += item[3];
                    }
                }      
            })
            for (var a in province_data) {
                this.chartData.push({value: province_data[a], name: a});
                this.pieProvince.push(a);
            }
            
            console.log(province_data);
        }
    }
}
</script>
<style>
</style>

