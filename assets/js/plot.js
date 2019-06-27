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
  for (i = 0; i < resp.length; i++) { 
    //console.log(resp[i].water_level);

    if (initset == false) {
      date = new Date(resp[i].timestamp);
      if (date.getDay() == today.getDay() && date.getMonth() == today.getMonth()) {
        initset = true;
        initx = resp[i].timestamp;
      }
    }
    xaxis.push(resp[i].timestamp);
    yaxis.push(resp[i].water_level)
  }

  endx = resp[i-1].timestamp;

  var traceWL = {
             x: xaxis,
             y: yaxis,
             fill: 'tonexty',
             type: 'line',
             mode: 'none'
         };

  var dataWL = [ traceWL ];

  var layout = {
    title: 'Measurements History',
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

$(document).ready(function(){
 setInterval(fetchdata,10000);
});

function toggle(button)
            {
              if(document.getElementById("autoupdateplot").value=="Update ON")
              {
                updateplot = false;
               document.getElementById("autoupdateplot").value="Update OFF";
              }
              else
              {
                updateplot = true;
                document.getElementById("autoupdateplot").value="Update ON";
              }
            }
