var expect = require('expect.js'),
  sinon = require('sinon'),
  simulate = require('event-simulate');
var Markers = require('../index'),
  Canvas = require('achart-canvas'),
  Util = require('achart-util');

 var node = Util.createDom('<div id="s1"></div>');
  document.body.appendChild(node);


  var canvas = new Canvas({
    id : 's1',
    width : 500,
    height : 500
  });
describe('achart-markers', function() {
 

  var markers = canvas.addGroup(Markers,{
    marker : {
      symbol : 'circle',
      fill : 'blue',
      radius : 5
    },
    actived : {
      stroke : 'red',

      radius : 8
    },
    items : [
      {x : 10,y: 10},
      {x : 20,y : 40},
      {x : 30,y : 80}
    ]
  });

  it('create', function() {
    expect(markers.getCount()).to.be(3);
  });

  it('getsnap',function(){
    var marker = markers.getSnapMarker(14);
    expect(marker.attr('x')).to.be(10);

    var marker1 = markers.getSnapMarker({ x : 30,y : 80});
    expect(marker1).not.to.be(undefined);
  });

  it('reset', function(done) {
    var items = [
      {x : 20,y: 10},
      {x : 30,y : 40},
      {x : 40,y : 80},
      {x : 50,y : 100}
    ];

    markers.change(items);
    setTimeout(function(){
      expect(markers.getCount()).to.be(items.length);
      done();
    },500)
    
  });

  it('addMarker', function() {
    var count = markers.getCount();
    var item = {x : 60,y : 120};
    markers.addMarker(item);
    expect(markers.getCount()).to.be(count + 1);
  });

  it('active',function(){
    var item = markers.getFirst();

    markers.setActivedItem(item);
    expect(item.attr('radius')).to.be(8);

    markers.clearActivedItem(item);
    expect(item.attr('radius')).to.be(5);

  });

  it('markerclick',function(){
    var item = markers.getFirst(),
      callback = sinon.spy();

    markers.on('markerclick',function(ev){
      expect(ev.point).not.to.be(undefined);
      expect(ev.marker).to.be(item);
      callback();
    });

    simulate.simulate(item.get('node'),'click');
    expect(callback.called).to.be(true);
  });

});

describe('invert single',function(){
  var markers = canvas.addGroup(Markers,{
    marker : {
      symbol : 'circle',
      radius : 5
    },
    single : true,
    invert : true,
    actived : {
      stroke : 'red',
      radius : 8
    },
    items : [
      {x : 110,y: 10},
      {x : 120,y : 40},
      {x : 130,y : 80}
    ]
  });

  var item = markers.getFirst();
  it('create',function(){
    expect(markers.getCount()).to.be(1);
    expect(item.get('visible')).to.be(false);
  });

  it('show',function(){
    markers.setActivedItem(item);
    expect(item.get('visible')).to.be(true);
  });

  it('hide',function(){
    markers.clearActivedItem(item);
    expect(item.get('visible')).to.be(false);

    markers.setActivedItem(item);
  });

  it('getSnapMarker',function(){

  });

});
