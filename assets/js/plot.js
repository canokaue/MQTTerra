var originalURL = "https://tranquil-forest-64117.herokuapp.com/waterlevelsjson/";
var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL


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
  
  for (i = 0; i < resp.length; i++) { 
    //console.log(resp[i].water_level);
    xaxis.push(resp[i].timestamp);
    yaxis.push(resp[i].water_level)
  }

  var traceWL = {
             x: xaxis,
             y: yaxis,
             fill: 'tonexty',
             type: 'line',
             mode: 'none'
         };

  var dataWL = [ traceWL ];

  var layout = {
    title: 'Measurements History'
  };

   Plotly.newPlot('plotdiv', dataWL, layout, {responsive: true});
   //Plotly.newPlot('footer', dataWL, layout);
}

function fetchdata(){
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

$(document).ready(function(){
 setInterval(fetchdata,5000);
});
