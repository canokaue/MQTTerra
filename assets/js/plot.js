var originalURL = "https://tranquil-forest-64117.herokuapp.com/waterlevelsjson/";
var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL

var updateplot = true;

function plot(resp) {
  //console.log("plot data");
  var xaxis = [];
  var yaxis = [];
  var i;
  var traceWL = {
             x: xaxis,
             y: yaxis,
             fill: 'tonexty',
             type: 'line',
             mode: 'none'
         };
  
  var initset = false;
  var today = new Date();
  var initx;
  var endx;
  var dict = {};

  for (i = 0; i < resp.length; i++) {
    dict[resp[i].id] = {timestamp : resp[i].timestamp, water_level : resp[i].water_level};
  }


  for (k in dict) {
  //for (i = 1; i <= count; i++) { 
    //console.log(k);

    if (initset == false) {
      date = new Date(dict[k].timestamp);
      if (date.getDay() == today.getDay() && date.getMonth() == today.getMonth()) {
        initset = true;
        initx = dict[k].timestamp;
      }
    }
    xaxis.push(dict[k].timestamp);
    yaxis.push(dict[k].water_level)
  }

  endx = dict[k].timestamp;

  //console.log(xaxis);
  var traceWL = {
             x: xaxis,
             y: yaxis,
             fill: 'tonexty',
             type: 'line',
             mode: 'lines',
             //GRAPH COLOR
             line: {color: '#ae85ca'}
         };

  var dataWL = [ traceWL ];

  var layout = {
    title: 'WATER LEVEL MEASUREMENT HISTORY',
    font: {size: 13},
     xaxis: {range: [initx, endx]},
  };

   Plotly.newPlot('plotdiv', dataWL, layout, {responsive: true});
   //Plotly.newPlot('footer', dataWL, layout);
}

function fetchdata(){
    if (updateplot) {
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json",
        // this headers section is necessary for CORS-anywhere
        headers: {
          "x-requested-with": "xhr" 
        }
      }).done(function(response) {
        //console.log('CORS anywhere response', response);
        plot(response);
      }).fail(function(jqXHR, textStatus) { 
        console.error(textStatus)
      })
    }
}

fetchdata();


function toggle(button)
            {
              fetchdata();
            }
