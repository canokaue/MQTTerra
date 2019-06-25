var originalURL = "https://tranquil-forest-64117.herokuapp.com/waterlevelsjson/";
var queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL

var resp = [];
  $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      // this headers section is necessary for CORS-anywhere
      headers: {
        "x-requested-with": "xhr" 
      }
    }).done(function(response) {
      resp.push(response);
      console.log('CORS anywhere response', response);
    }).fail(function(jqXHR, textStatus) { 
      console.error(textStatus)
    })

    console.log("potato",resp);