/*
			\|/ MQTTerra

 * @ Authors: Andre Schlichting & Kaue Cano 
 * @ Create Time: 2019-06-25 21:01:19
 * @ Modified by: canokaue
 * @ Modified time: 2019-06-26 09:46:53

*/

var temperatura;

connection = false;

// Notification options
Notification.requestPermission().then(function(result) {
    console.log(result);
  });
const not_img = '/icons/alert.png';
const not_title = 'Warning!';
const not_body = 'Your reservoir is running low.';

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
    client.subscribe("/topic/distance");
    client.subscribe("/topic/relaystatus");
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

/*

// Called when a message arrives - using switch case (bugged)
function onMessageArrived(message) {
    switch (message.destinationName) {
        case '/topic/temperature':
            document.getElementById("temperature").innerHTML = message.payloadString;
            document.getElementById("temperature").style.fontSize = "300%";
        case '/topic/humidity':
            document.getElementById("humidity").innerHTML = message.payloadString;
            document.getElementById("humidity").style.fontSize = "300%";
        default:
            console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName);
        
    }

*/
function onMessageArrived(message) {
    if (message.destinationName == '/topic/temperature') {
            document.getElementById("temperature").innerHTML = message.payloadString;
            document.getElementById("temperature").style.fontSize = "300%"; 
            console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); }
            
    else if (message.destinationName == '/topic/humidity') {
            document.getElementById("humidity").innerHTML = message.payloadString;
            document.getElementById("humidity").style.fontSize = "300%"; 
            console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); }

    else if (message.destinationName == '/topic/plant1') {
        document.getElementById("plant1").innerHTML = message.payloadString;
        document.getElementById("plant1").style.fontSize = "300%"; 
        console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); }

    else if (message.destinationName == '/topic/distance') {
        document.getElementById("distance").innerHTML = message.payloadString;
        document.getElementById("distance").style.fontSize = "200%"; 
        console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); 
        if (parseInt(message.payloadString.substring(0,2),10) > 10) {
            document.getElementById("page_title").innerHTML = "(!) MQTTerra Dashboard";
            new Notification(not_title, { body: not_body, icon: not_img });
        }
        else {document.getElementById("page_title").innerHTML = "MQTTerra Dashboard";} }
    
    else if (message.destinationName == '/topic/relaystatus') {
        document.getElementById("relaystatus").innerHTML = message.payloadString;
        document.getElementById("relaystatus").style.fontSize = "300%"; 
        console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName); }
        if (message.payloadString == 'ON') {
            document.getElementById("relay_color").className = "style6";
            document.getElementById("io").innerHTML = "Close --";
        }
        else if (message.payloadString == 'OFF') {
            document.getElementById("relay_color").className = "style7";
            document.getElementById("io").innerHTML = "Open \\|/";
        }
    }
    /*console.log("onMessageArrived: " + message.payloadString + "    Topic: " + message.destinationName);
    document.getElementById("messages").innerHTML = '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    document.getElementById("temperature").innerHTML = message.payloadString + '°C';
    document.getElementById("humidity").innerHTML = message.payloadString + '%';*/


// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML = '<span>Disconnected</span><br/>';
}

function relay() {
    
    message = new Paho.MQTT.Message("1");
    message.destinationName = "/topic/relay";
    client.send(message);

  }

  function doFail(e){
    console.log(e);
  }