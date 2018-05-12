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
    center: [117.2736, 31.8646],
    //地图中心为117.2736, 31.8646
    zoom: 13,            // 并且定义地图显示层级为12
    projection : 'EPSG:4326'
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
    target: document.getElementById('map')
});


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
//  layer1 为药店,即在地图中显示的图层
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

//缓存区图层
/*
let shoplayerbuff = new ol.layer.Vector();
function reBuffer(name){
    fetch('/api/shop').then(function(response) {
        return response.json();
      }).then(function(json) {
        var format = new ol.format.GeoJSON();
        var features = format.readFeatures(json, {featureProjection: 'EPSG:3857'});
        var parser = new jsts.io.OL3Parser();
            
            for (var i = 0; i < features.length; i++) {
            
            var feature = features[i];
            // convert the OpenLayers geometry to a JSTS geometry
            var jstsGeom = parser.read(feature.getGeometry());

            // create a buffer of 40 meters around each line
            var buffered = jstsGeom.buffer(80);

            // convert back from JSTS and replace the geometry on the feature
            feature.setGeometry(parser.write(buffered));
            }
        let vectorSoure = new ol.source.Vector();
        vectorSoure.addFeatures(features);
        shoplayerbuff.setSource(vectorSoure);
      });
    
}
//缓冲区图层
*/
let shoplayerbuff = new ol.layer.Vector({
    source:vectorSoure,
    style : new ol.style.Style({
        image : new ol.style.Circle({
            radius: 30,
            fill: new ol.style.Fill({
                color:'rgba(255,255,255,0.4)'
            }),
            stroke: new ol.style.Stroke({color: 'red', width: 1})
        })
    })


})






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
            stroke: new ol.style.Stroke({color: 'green', width: 2})
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
    //console.log(Reflect.ownKeys(feature.getProperties()));
    if(feature.getProperties().fathername){
        var coordinate = e.mapBrowserEvent.coordinate;
    
        //alert(coordinate);
        const pro = feature.getProperties();
        content.innerHTML = `<p> 药店名称: ${pro.name} </p> <p>卖方名称 : ${pro.fathername}</p><a href="/record?id=${pro.id}&name=${pro.name}" target="_blank">交易记录</a>`;
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
$(function(){
    const $shoparr = $('a.yaodian');
    for(let i = 0; i<$shoparr.length; i+=1){
        let t = $($shoparr[i]);
    }
})
*/
function subWin(url){
     window.open(url,'wroxWindow',"height=500,width=800,top=300,left=300,resizable=yes,scrollbars=yes,location=no");
}

$(function(){
	$('#analyze').click(function(){
		 subWin('often');
	});
			
});

$(function(){
    $('#tuceng').click(function(){
        try{ map.removeLayer(layer3)}
        catch(e){}
    })
})

//以下为进行区域统计的代码
        var polygonLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                color:'rgba(255,225,205,0.4)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'red',
                    size: 1
                })
            })
        })
        
        var draw = new ol.interaction.Draw({
            type : 'Polygon',
            source : polygonLayer.getSource()
        });
        // 监听线绘制结束事件，获取坐标
        draw.on('drawend', function(event){
            // event.feature 就是当前绘制完成的线的Feature
            const content = JSON.stringify(event.feature.getGeometry().getCoordinates());
            //alert(content);
            $.post('polygon',{ 'content': content})

        });
        
        
        $(function(){
            var b = true;
            $('#draw').click(function(){
                if(b){

                     map.addInteraction(draw);
                    
                     map.addLayer(polygonLayer);
                     
                     map.removeInteraction(selectInteraction2);
                     b = !b;
                }else{
                    b = !b;
                    map.removeInteraction(draw);
                     map.removeLayer(polygonLayer);
                     /*
                     polygonLayer.setSource(new ol.source.Vector());
                     draw.set('source', polygonLayer.getSource(),true);
                     */
                     map.addInteraction(selectInteraction2);
                }
            })
        })



 
