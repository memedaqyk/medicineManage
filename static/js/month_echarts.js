'use strict';

$(function(){
    //准备好要初始化的实例
        var myChart = echarts.init(document.getElementById('main'));
        //图表配置
        var option = {
            title : {
                text : '购买数量统计'
            },
            tooltip : {},
            legend : {
                data : ['购买次数']
            },
            xAxis : {
                data :[]
            },
            yAxis : {},
            series : [{
                name : '次数',
                type : 'bar',
                data : []
            }]
        }
        myChart.setOption(option);
        myChart.showLoading();
        $.get('api/month/data').done(function(data){
            myChart.hideLoading();
            let name = [],count = [];
            console.log(data);
            for(let t of data){
                name[name.length] = t.id;
                count[count.length] = t.number;
            }
            myChart.setOption({
                xAxis : {
                    data : name
                },
                yAxis : {},
                series : [{
                    name : '次数',
                    type : 'bar',
                    data : count
                }]
            })
        })

    
})
