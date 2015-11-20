var svg = d3.select('body').append('svg')
  .attr({
    width: 1100,
    height: 1000,
  });

// d3.select('body').append('div')
//   .append('input')
//   .style({
//     top: '-100px'
//   })

svg.append('rect')
  .attr({
    x: 500,
    y: 400,
    width: 200,
    height: 100,
  })
  .style('fill', '#e4e5e5')
  .on('mousedown', function() {
    this.remove();
    startText.remove();
    run();
  })

var startText = svg.append('text')
  .style({
    'font-family': 'Open Sans',
    'font-size': 30,
    'pointer-events': 'none',
  })
  .attr({
    x: 565,
    y: 460
  })
  .text('Start!')

var global = {};
global.time = 30;
var numCircles = 7;
var speed = 2000;

var data = [];
for (var i = 0; i < numCircles; i++) {
  data.push(i);
}

var circles = svg.selectAll('circle')
  .data(data);

circles.enter().append('circle')
  .on('mousedown', function(d) {
    var thisCircleColor = d3.select(this).style('fill')
    var currentColor = hexToRgb(colorArrayText[global.randomColor])
    
    var score = parseFloat(counter.text());
    if (thisCircleColor === currentColor) {
      score = score + 1;
      counter.text(score);

      d3.select(this).transition().attr('r', 0);
    } else {
      score = score - 2;
      counter.text(score)

      d3.select(this).transition().attr('r', 0);
    }
  })

var backgroundRect = svg.append('rect')
  .attr({
    width: 1100,
    height: 100
  })
  .style({
    fill: '#add8e6',
  })

var counterLabel = svg.append('text')
  .style({
    'font-size': 20,
    'font-family': 'Open Sans',
  })
  .attr('transform', 'translate(930, 50)')
  .text('Score:');

var counter = svg.append('text')
  .classed('counter', true)
  .style({
    'font-size': 20,
    'font-family': 'Open Sans',
  })
  .attr('transform', 'translate(1000,50)')
  .text(0);

var timerLabel = svg.append('text')
  .style({
    'font-size': 20,
    'font-family': 'Open Sans',
  })
  .attr('transform', 'translate(930,80)')
  .text('Time:');

var time = svg.append('text')
  .style({
    'font-size': 20,
    'font-family': 'Open Sans',
  })
  .attr('transform', 'translate(1000,80)')
  .text(global.time);

var textGroup = svg.append('g').classed('textGroup', true).attr('transform', 'translate(0,50)');
var red = textGroup.append('text').classed('red', true).attr('x', 50).style('fill', 'red').text('Red');
var orange = textGroup.append('text').classed('orange', true).attr('x', 200).style('fill', 'orange').text('Orange');
var yellow = textGroup.append('text').classed('yellow', true).attr('x', 350).style('fill', 'yellow').text('Yellow');
var green = textGroup.append('text').classed('green', true).attr('x', 500).style('fill', 'green').text('Green');
var blue = textGroup.append('text').classed('blue', true).attr('x', 650).style('fill', 'blue').text('Blue');
var purple = textGroup.append('text').classed('purple', true).attr('x', 800).style('fill', 'purple').text('Purple');

var colorArray = [red, orange, yellow, green, blue, purple];
var colorArrayText = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#800080'];

textGroup.selectAll('text')
  .style({
    'font-size': 20,
    'font-family': 'Open Sans',
  });

function run() {

  setInterval(function() {
    if (global.time > 0) {
      var newTime = parseFloat(time.text()) - 1;
      time.text(newTime);
      global.time = newTime;
    }
  }, 1000)

  setInterval(function() {

    if (global.time > 0) {

      //color of the text element
      var randomColor = Math.round(Math.random()*10);
      if (randomColor > 5) {
        randomColor = randomColor - 5;
      }
      global.randomColor = randomColor;

      //which text will be colored
      var randomText = Math.round(Math.random()*10);
      if (randomText > 5) {
        randomText = randomText - 5;
      }
      global.randomText = randomText;

      selectColorOfText(randomColor, randomText);

      drawCircle();
    } else {
      svg.selectAll('circle').remove();

      svg.append('rect')
        .attr({
          x: 350,
          y: 400,
          width: 400,
          height: 200,
        })
        .style('fill', 'E4E5E5');

      svg.append('text')
        .attr('transform', 'translate(550,510)')
        .style({
          'text-anchor': 'middle',
          'font-family': 'Open Sans',
          'font-size': 40,
        })
        .text('Your score is ' + counter.text() + '!');
    }
  }, speed);
}

function selectColorOfText(randomColor, randomText) {
  textGroup.selectAll('text').style('fill', '#E4E5E5');
  colorArray[randomText].style('fill', String(colorArray[randomColor].attr('class')));
}

function drawCircle() {

  circles.attr({
      cx: function() {
        if (d3.select(this).attr('cx')) {
          return d3.select(this).attr('cx');
        } else {
          return Math.random()*1000 
        }
      },
      cy: function() {
        if (d3.select(this).attr('cy')) {
          return d3.select(this).attr('cy');
        } else {
          return Math.random()*1000;
        }
      },
      r: function() {
        if (d3.select(this).attr('r')) {
          return Math.random() * 100;
        } else {
          return d3.select(this).attr('r')
        }
      },
      'stroke-width': function() {
        return Math.random() * 20;
      }
    })
    .style({
      'fill': function(d,i) {
        if (d === 0) {
          return colorArrayText[global.randomColor];
        } else {
          var randomCircleColor = Math.round(Math.random()*10);
          if (randomCircleColor > 5) {
            randomCircleColor = randomCircleColor - 5;
          }
          return colorArrayText[randomCircleColor];
        }
      },
      'stroke': function() {
        var randomCircleColor = Math.round(Math.random()*10);
        if (randomCircleColor > 5) {
          randomCircleColor = randomCircleColor - 5;
        }
        return colorArrayText[randomCircleColor];
      },
      'stroke-width': function() {
        return Math.random() * 20;
      }
    })
    .transition()
    .duration(function(d,i) { return Math.random()*2000; })
    .attr({
      cx: function() { return Math.random()*1000; },
      cy: function() { return Math.random()*1000; },
      r: function() { return Math.random()*100; },
    });

  circles.exit();
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')'
    : null;
}