// server.js
const express = require('express');
const cors = require('cors');
const mqtt = require('mqtt');

const app = express();
app.use(express.json());
app.use(cors());

const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

app.post('/send', (req, res) => {
  const message = req.body.message;
  mqttClient.publish('nitesh/iot/switch', message);
  res.json({ status: `MQTT message "${message}" sent` });
});

app.listen(3000, () => {
  console.log('Backend running at http://localhost:3000');
});
