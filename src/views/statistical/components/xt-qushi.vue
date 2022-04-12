<template>

        <div class="flex col w_100  bg_fff b_radius10 qs_big_box margin_bottom ">
                <div class="qs02 flex row qs_top b_line b_line pad_l_30 pad_r_30">
                    <div class="flex row">
                        <div class="h_100 left font14">绩效统计</div>
                    </div>
                    <div class="h_100 r_ed right"></div>
                </div>
                <div class="flex_1 mar_t_20">
                    <div class="quxian" id="quxian"></div>
                </div>
        </div>
  
</template>

<script>
export default {
  props:['msg'],
  name: '',
    computed: {
        watchMsg() {
            return this.msg.dataTxt;
        },
    },
  watch: {
        watchMsg() {
            this.drawing();
        },
  },
  data(){
        return {
            tabIndex:0
        }
  },
  methods:{

        drawing(){
                var THIS = this;
                var dom = document.getElementById('quxian');
                var myChart = echarts.init(dom);
                var texts = '';
                var seriesArr = [];
                for(let i=0;i<THIS.msg.data.length;i++){
                    seriesArr.push({
                            name: THIS.msg.data[i].title,
                            type:'line',        //线条
                            smooth: true,       //曲线
                            data:THIS.msg.data[i].data,
                            lineStyle: {//填充区域样式
                                color: THIS.msg.data[i].line_color,
                                width: 2
                            }, 
                            itemStyle:{//线条的样式
                                normal: {// 点的颜色。
                                    color: THIS.msg.data[i].line_color
                                },
                            }
                        })
                };
                var option = {
                    tooltip : {
                        trigger: 'axis',
                    },
                    legend: {
                        data: ['在职人数', '离职员工', '录入员工', '出发员工', '入职员工']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '6%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : THIS.msg.dataTxt
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : seriesArr,  
                };
                var app = {};
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                    window.onresize = myChart.resize;
                };
        },

        tab(index){
            this.tabIndex = index;
        }

  },
   mounted(){
        this.drawing();
  }
}
</script>

<style scoped>
   .qs_big_box{
     height: 6rem;
   }
   .qs_top{
     height: 0.9rem;
     line-height: 0.9rem;
   }
   .qs01 .left,.qs02 .left{
      width: 1rem;
      margin-right: 0.5rem;
   }
   .qs01 .right{
     width: 2.8rem;
   }
   .quxian{
      width: 100%;
      height: 4.9rem;
      box-sizing: border-box;
   }
   .v_data li{
      line-height: 0.5rem;
      margin-right: 0.2rem;
   }
   .v_data li.current{
      border-bottom: 2px solid #007DF1;
      color: #007DF1;
   }
</style>
