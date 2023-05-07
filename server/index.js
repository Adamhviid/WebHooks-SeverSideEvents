import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const messages = [];

app.post("/subscribe", (req, res) => {
  messages.push(req.body);
  res.send("Subscribed");

});

app.get("/messages", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
  });
  setInterval(() => getMessages(res), 100);
});

function getMessages(res) {
  const time = new Date().toLocaleTimeString()
  res.write(`data: ${(JSON.stringify(messages))}\n\n`);
  messages.pop();
}

function sendTime(res) {
  res.write(`data: ${(new Date()).toLocaleTimeString()}\n\n`);
}

/* app.get("/", (req, res) => {
  res.send("Hello World!");
}); */

// start server
app.listen(5500, () => {
  console.log(`Server listening on port 5500`);
});
