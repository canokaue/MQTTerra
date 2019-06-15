

connection = false;

// Called on CONNECT click

// Generate a random client ID
clientID = "clientID-" + parseInt(Math.random() * 100);
client = new Paho.MQTT.Client("postman-01.cloudmqtt.com", 37841, "web_client:"+ clientID);

/*if (connection = true) {

    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    
}
else
    // Print output for the user in the messages div
*/
//document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
//document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

// Initialize new Paho client connection
// client = new Paho.MQTT.Client("mqtt://ftaylsiy:dyygblVZaO0l@postman-01.cloudmqtt.com", Number(17841), clientID);


// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

var options = {
    useSSL: true,
    userName : "ftaylsiy",
    password : "dyygblVZaO0l",
    onSuccess:onConnect,
    onFailure:doFail
}
// Connect the client, if successful, call onConnect function
client.connect(options);


// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    //topic = "#";

    // Print output for the user in the messages div
    // document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    client.subscribe("/topic/plant1");
    client.subscribe("/topic/temperature");
    client.subscribe("/topic/humidity");
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName);
    document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    document.getElementById("temperature").innerHTML += message.payloadString + '°C';
    document.getElementById("humidity").innerHTML += message.payloadString + '%';
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
}

function relay() {
    message = new Paho.MQTT.Message("1");
    message.destinationName = "/topic/relay";
    client.send(message);
  }

  function doFail(e){
    console.log(e);
  }