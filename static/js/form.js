'use strict'


 $(function(){
            //根据数据库返回对象，动态生成表格
        let sellData = [];
        let toArr = function(index,obs){
            let arr = [],i=0;
            let Ob = function(i,t) {
                    this.row = index;
                    this.col = i;
                    this.text = t;    
            };
            let art = ['name','price','number','data','countmouth'];

            
            for(let t of art){
                
                arr.push(new Ob(i,obs[t]));
                i += 1;
            }
            return arr;
            
        }
        const $name = $('#shopid');
      
        //console.log($fatherid);
        $.getJSON(`/api/sellrecorld/${$name.text()}`,(data) => {
            $.each(data, (index,t) => {
                //这儿不能用 arr[i] = value;
                sellData.push(toArr(index,t));

            })
            console.log(JSON.stringify(sellData));
        })



            var vm = new Vue({
                el : '#sheet',
                data: {
                    title : 'New Sheet',
                    header : [
                        {row : 0, col : 0, text:'药品名称'},
                        {row : 0, col : 2, text:'单价'},
                        {row : 0, col : 3, text:'数量'},
                        {row : 0, col : 4, text:'日期'},
                        {row : 0, col : 5, text:'统计月份'}
                    ],
                    rows : sellData,
                    selectedRowIndex : 0,
                    selectedColIndex : 0
                },
                methods : {
                   
                    change :function(e) {
                        //change事件传入的是e的dom事件
                        var rowIndex = this.selectedRowIndex,
                            conIndex = this.selectedColIndex,
                            text;
                        
                        if(rowIndex > 0 && colIndex > 0) {
                            text = e.target.innerText;
                            this.row[rowIndex][colIndex].text = text;
                        }
                    },
                    focus :function(cell) {
                        this.selectedRowIndex = cell.row;
                        this.selectedColIndex = cell.col;
                    }

                }
            });
            window.vm = vm;
            });