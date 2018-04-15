'use strict';


//将点线转化为geojson数据

var geojsonObject = {
    type : 'FeatureCollection',
    crs  : {
        type : 'name',
        properties : {
            'name' : 'EPSG:4326'
        }
    },
    features : [],
    addLine : function(a,b,opt){
        var t = {
            type : 'Feature',
            geometry : {
                type : 'LineString',
                coordinates : [a,b]
            },
            properties : opt
        }
        this.features.push(t);
    },
    addPonint : function(x,y,opt){
        var t = {
            type : 'Feature',
            geometry : {
                type : 'Point',
                coordinates : [x,y,0]
            },
            properties : opt
        }
        this.features.push(t);
    },
    //每次使用前  调用它 删除缓存数据
    clear : function(){
        this.features = [];
        return this;
    }
};

//test 
/*
geojsonObject.addLine([2,3],[5,6],{name : 'line'});
console.log(JSON.stringify(geojsonObject));
*/

module.exports = geojsonObject.clear();