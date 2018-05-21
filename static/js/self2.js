'use strict'
//单击窗口

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var overlay = new ol.Overlay(({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));
/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
//隐藏popup
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
//视野
var view1 = new ol.View({
    center: ol.proj.transform([117.2736, 31.8646], 'EPSG:4326', 'EPSG:3857'),
    //地图中心为117.2736, 31.8646，并把坐标投影转换为3857（web 墨卡托投影）
    zoom: 13            // 并且定义地图显示层级为12
})
// 创建地图
var map = new ol.Map({
    // 设置地图图层

    layers: [
        // 创建一个使用Open Street Map地图源的瓦片图层

        new ol.layer.Tile({source: new ol.source.OSM()})
    ],
    overlays: [overlay],
    // 设置显示地图的视图
    view: view1,
    // 让id为map的div作为地图的容器
    target: 'map'
});

/*
var wmsSource = new ol.source.TileWMS({
    url:'http://localhost:8089/geoserver/cxxm/wms',
    params:{
        'LAYERS':'cxxm:yaodian',//要加载的图层，可以为多个
        'TILED':false
    },
    serverType:'geoserver'//服务器类型
})
var layer1 = new ol.layer.Tile({
        source:wmsSource
    }
);
*/
const getsize = function(){
    var data = map.getView().getZoom()/2;
    if(data>20){
        return 20;
    }
    if(data < 3){
        return 3;
    }
    return data;
}
//  layer1 为药店
var vectorSoure = new ol.source.Vector({
    format:new ol.format.GeoJSON(),
    url:'/api/shop'
});
var layer1 = new ol.layer.Vector({
    source:vectorSoure,
    style : new ol.style.Style({
        image : new ol.style.Circle({
            radius: getsize(),
            fill: new ol.style.Fill({
                color:'red'
            }),
            stroke: new ol.style.Stroke({color: 'red', width: 1})
        })
    })


})
map.addLayer(layer1);
/*
// 选择器
var selectInteraction1 = new ol.interaction.Select({
    style: new ol.style.Style({
        image : new ol.style.Circle({
            radius: getsize(),
            fill: new ol.style.Fill({
                color:'#FFFF00'
            }),
            stroke: new ol.style.Stroke({color: 'red', width: 2})
        })

    }),
    layers:[layer1]
});
selectInteraction1.on('select',function (e) {
    var coordinate = e.mapBrowserEvent.coordinate;
    
    //alert(coordinate);
    var feature = selectInteraction1.getFeatures().getArray()[0];
    content.innerHTML = '<p> 药店名称：'+ feature.getProperties().name +'</p>'+ '<a href="/form" target="_blank">交易记录</a>';
    //alert('选中'+ feature.getProperties().name);
    overlay.setPosition(coordinate);
});
map.addInteraction(selectInteraction1);
*/

//添加服务器生成的geojson（非geoserver)
//layer2为公司
var vectorSoure2 = new ol.source.Vector({
    format:new ol.format.GeoJSON(),
    url:'/api/firm'
});
var layer2 = new ol.layer.Vector({
    source:vectorSoure2,
    style : new ol.style.Style({
        image : new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({
                color:'green'
            }),
            stroke: new ol.style.Stroke({color: 'green', width: 1})
        })
    })


})
map.addLayer(layer2);

// 选择器
var selectInteraction2 = new ol.interaction.Select({
    style: new ol.style.Style({
        image : new ol.style.Circle({
            radius: getsize(),
            fill: new ol.style.Fill({
                color:'#FFFF00'
            }),
            stroke: new ol.style.Stroke({color: 'red', width: 2})
        })

    }),
    layers:[layer1,layer2]
});
let layer3;//储存动态生成的图层
selectInteraction2.on('select',function (e) {
    var feature = selectInteraction2.getFeatures().getArray()[0];
    console.log(Reflect.ownKeys(feature.getProperties()));
    if(feature.getProperties().fathername){
        var coordinate = e.mapBrowserEvent.coordinate;
    
        //alert(coordinate);
        
        content.innerHTML = '<p> 药店名称：'+ feature.getProperties().name +'</p>'+ '<a href="/form" target="_blank" style="background:rgb(122, 184, 147);color: white;font-size: 15px;">交易记录</a>';
        //alert('选中'+ feature.getProperties().name);
        overlay.setPosition(coordinate);
    }else{
        var vectorSoure3 = new ol.source.Vector({
            format:new ol.format.GeoJSON(),
            url:'/api/toline/' + feature.getProperties().id
        });
        if(layer3){
            map.removeLayer(layer3);
        }
        layer3 = new ol.layer.Vector({
            source:vectorSoure3,
            style : new ol.style.Style({
                stroke : new ol.style.Stroke({
                    color : 'green',
                    width : 1
                })
            })
        })
        map.addLayer(layer3);
    }
});
 map.addInteraction(selectInteraction2);
 /*
 let change = function(){
     let moshi = 0;
     return function(){
         if(moshi === 0){
             map.removeLayer(layer1);
             map.removeInteraction(selectInteraction1);
             map.addLayer(layer2);
             map.addInteraction(selectInteraction2);
             moshi = 1;
         }else if (moshi === 1){
             map.removeLayer(layer2);
             map.removeLayer(layer3);
             map.removeInteraction(selectInteraction2);
             map.addLayer(layer1);
             map.addInteraction(selectInteraction1);
             moshi = 0;
         }
         
     }
 }

 $('#tuceng').click(change());
*/

 //为点击右侧目录名称注册事件
$(function(){
    const $shoparr = $('a.yaodian');
    for(let i = 0; i<$shoparr.length; i+=1){
        let t = $($shoparr[i]);
        t.click(function(){
            console.log('点击了' + t.text());
        })
    }
})
 
