# MQTTerra

MQTTerra is an IoT solution for plant irrigation and monitoring developed using [ESP32 development kits](https://docs.zerynth.com/latest/official/board.zerynth.doit_esp32/docs/index.html).

It tracks the temperature, soil moisture, air humidity and water distance of the irrigation apparatus via topics created using a [CloudMQTT](https://www.cloudmqtt.com/) 3.1.1 Broker, to whom both endpoints are connected (web dashboard and ESP32 boards).

App-side, Elipse Paho's [JavaScript client](https://www.eclipse.org/paho/clients/js/) was implemented so the user can interact fully regardless of platform (PC, mobile, tablet...).

Authors: [André Schlichting](https://github.com/alucassch) (mainly backend), [Kauê Cano](https://github.com/canokaue/) (mainly frontend).



## About

This project is the final delivery of an IoT-focused program offered at [UFSC](ufsc.br) (Federal University of Santa Catarina - Brazil) called [EEL7515 - Advanced Topics on Signal Processing II / Telecommunications IV](http://geltro.ufsc.br/files/2016/07/EEL7515-T%C3%B3pico-Avan%C3%A7ado-em-Processamento-de-Sinais-II.pdf), mainly administered by PhD Richard Demo Souza.

Aiming to know more about the fields of electronic sensor monitoring, data storage and IoT, we proposed to develop a monitoring system of different areas of a garden, compiling info such as the level of water in a reservoir and the quality of potted soil of plants into an SQL database, as well as MQTT topic that also ables the ESP32 boards to receive remote control instructions.

Users can monitor the information through a web page in the form of a dashboard with a simple, slick design.


## Contributing
As mentioned, MQTTerra was developed (among many other reasons such as technological benchmark, curiosity, interest in IoT and so on) to deliver on the final project of EEL7515.

With that in mind, requests, issues and recommendations are welcome, but we're not actively developing MQTTerra from 2019 Q3 on.

For major changes, please open an issue first to discuss what you would like to change.



## License
[MIT](https://choosealicense.com/licenses/mit/)