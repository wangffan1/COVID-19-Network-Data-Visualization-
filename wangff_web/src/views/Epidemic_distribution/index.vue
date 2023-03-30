<template>
    <div id = "epic_distribution">
        <input type="file" @change="handleFile">
        <div ref="piechart" style="height: 400px; width: auto; align-items: center;"></div>
        <div id="bar_chart_first" style="height: 500px; width: auto; align-items: center;"></div>
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
            provinceData: [],
        }
    },
    watch: {
        // sheetData() {
        //     if(this.sheetData.length != 0) {
        //         this.renderChart();
        //         this.barChart();
        //     }
        // }
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
                this.renderChart();
                this.barChart();
                
            };
            reader.readAsBinaryString(file);   

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
                this.provinceData.push(province_data[a]);
            }
            
            console.log(province_data);
        },
        
        renderChart() {
            const pieChart = echarts.init(this.$refs.piechart);

            pieChart.resize();
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
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(1, 1, 100, 0.5)'
                            }
                        }
                    }
                ]
            };
            pieChart.setOption(option);
            console.log("111", this.chartData.values())
        },
        
        barChart() {
            var myChart = echarts.init(document.getElementById('bar_chart_first'));
            var option = {
                title: {					         	
                    text: '主标题',                
                    textStyle:{					
                        color:'rgb(1,1,1)'
                    },

                    padding:[0,0,100,100]				
                    
                },

                legend: {
                    type:'plain',				
                    top:'1%',					          	
                    selected:{
                        '销量':true,			
                    },
                    textStyle:{					
                        color:'rgb(1,1,1)',				
                    },           	
                    // data:[						
                    //     {
                    //         name:'销量',
                    //         icon:'circle',			
                    //         textStyle:{
                    //             color:'#fff',		
                    //         }
                    //     }
                    // ],						
                },
             
                grid:{
                    show:false,					
                    top:80,						
                    containLabel:false,			
                    tooltip:{					
                        show:true,	
                        trigger:'item',			
                        textStyle:{
                            color:'#666',
                        },
                    }
                },

                xAxis: {
                    show:true,					
                    position:'bottom',			
                    offset:0,					
                    type:'category',			
                    name:'省份',				
                    nameLocation:'end',			
                    nameTextStyle:{				
                        color:"rgb(1,1,1)",
                        padding:[5,0,0,-5],	
                    },
                    nameGap:15,	
                    
                    axisLine:{					
                        show:true,					
                        symbol:['none', 'arrow'],	
                        symbolSize:[8, 8] ,			
                        symbolOffset:[0,7],		
                        lineStyle:{
                            color:'rgb(1,1,1)',
                            width:1,
                            type:'solid',
                        },
                    },
                    axisTick:{					
                        show:true,					
                        inside:true,				
                        length:1,					
                        lineStyle:{
                            width:1,
                            type:'solid',
                        },
                    },
                    axisLabel:{					
                        show:true,					
                        inside:false,				
                        rotate:0,						
                        margin: 5,					
                    },
                    splitLine:{					
                        show:false,				
                        lineStyle:{
                           
                        },
                    },
                    splitArea:{					
                        show:false,					
                    },           	
                    data: this.pieProvince, 
                },

                yAxis: {
                    show:true,					
                    position:'left',			
                    offset:0,				
                    type:'value',			
                    name:'数量',				
                    nameLocation:'end',			
                    nameTextStyle:{				
                        color:"rgb(1,1,1)",
                        padding:[5,0,0,5],	
                    },
                    nameGap:15,					
                    axisLine:{					
                        show:true,					
                        symbol:['none', 'arrow'],	
                        symbolSize:[8, 8] ,			
                        symbolOffset:[0,7],			
                        lineStyle:{
                            color:'rgb(1,1,1)',
                            width:1,
                            type:'solid',
                        },
                    },
                    axisTick:{					
                        show:true,					
                        inside:true,				
                        lengt:3,					
                        lineStyle:{
                            width:1,
                            type:'solid',
                        },
                    },
                    axisLabel:{				
                        show:true,					
                        inside:false,				
                        rotate:0,					
                        margin: 8,					
                    },
                    splitLine:{					
                        show:true,					
                        lineStyle:{
                            color:'#666',
                            width:1,
                            type:'dashed',			
                        },
                    },
                    splitArea:{					
                        show:false,					
                    },   
                    data: this.pieProvince,                      
                },

                series: [
                    {
                        //name: '销量',				
                        type: 'bar',				
                        legendHoverLink:true,		
                        label:{						
                            show:false,
                            position:'top',	
                            rotate:0,				
                            color:'rgb(1,1,1)',
                        },
                        itemStyle:{					
                            color:'rgb(15,200,10)',
                            BorderRadius:[18,18,0,0],
                        },
                        barWidth:'20',				
                        barCategoryGap:'20%',		
                        data: this.provinceData,
                    }
                ]
            };

            myChart.setOption(option);
        }
    }
}
</script>
<style>
</style>

