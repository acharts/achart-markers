# Demo

---

## Normal usage

````html

<div id="c1"></div>

````

````javascript
seajs.use(['index','achart-canvas'], function(Markers,Canvas) {
  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var symbols = ['circle','square','diamond','triangle','triangle-down','url(http://mat1.gtimg.com/www/images/qq2012/weather/20120906/sun.png)'],
    items = [];
  for(var i= 0; i < 9; i++){
    var value = parseInt(200 * Math.random()) + 300;
    items.push({
      x : (i + 1) * 50,
      y : 500 - value,
      value : value,

      symbol : symbols[i % 6]
    });
  }
  var markers = canvas.addGroup(Markers,{
    marker : {
      fill : 'red',
      symbol : 'rect',
      radius : 5
    },
    actived : {
      radius : 10
    },
    items : items
  });

  markers.on('markerclick',function(ev){
    var marker = ev.marker;
    markers.setActivedItem(marker);
    console.log(ev.item);
  });

});
````

## extension marker's type

````html

<div id="c2"></div>

````

````javascript
seajs.use(['index','achart-canvas'], function(Markers,Canvas) {
  var canvas = new Canvas({
    id : 'c2',
    width : 500,
    height : 500
  });
/** doc watch 存在 bug
  Canvas.Shape.Marker.Symbols.ring = function(x,y,r){
    return [['M',x,y - r],['a',r,r,0,1,1,0,2*r],['a',r,r,0,1,1,0,-2*r],['M',x,y-r+2],['a',r-2,r-2,0,1,0,0,2*(r-2)],['a',r-2,r-2,0,1,0,0,-2*(r - 2)],['z']];
  }
**/
  var items = [];
    
  for(var i= 0; i < 9; i++){
    var value = parseInt(300 * Math.random()) + 200,
      item = {
        x : (i + 1) * 50,
        y : 500 - value,
        value : value
      };
    /*if(i % 2 == 0){
      item.symbol = function(x,y,r){
        [['M',x-r,y-r],['L',x + r,y-r],['L',x + r,y + r],['L',x - r,y + r],['M',x,y - r],['a',r,r,0,1,0,0,2*r],['a',r,r,0,1,0,0,-2*r],['z']]
      }
    }*/
    items.push(item);
  }
  var markers = canvas.addGroup(Markers,{
    marker : {
      fill : 'red',
      stroke : 'blue',
      symbol : function(x,y,r){
        return [['M',x-r,y-r],['L',x + r,y-r],['L',x + r,y + r],['L',x - r,y + r],['L',x-r,y-r],['M',x,y - r +2],['a',r-2,r-2,0,1,0,0,2*(r-2)],['a',r-2,r-2,0,1,0,0,-2*(r - 2)],['z']]
      },
      radius : 5
    },
    actived : {
      radius : 10
    },
    items : items
  });

  markers.on('markerclick',function(ev){
    var marker = ev.marker;
    markers.setActivedItem(marker);
    console.log(ev.item);
  });

});
````
