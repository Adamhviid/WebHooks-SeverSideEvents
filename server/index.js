import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));


app.listen(5500, () => {
  console.log(`Server listening on port 5500`);
});

const messages = [];

//webook
app.post("/subscribe", (req, res) => {
  messages.push(req.body);
  res.send("Subscribed");
});

//sse
app.get("/messages", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
  });
  setInterval(() => getMessages(res), 100);
});

function getMessages(res) {
  res.write(`data: ${(JSON.stringify(messages))}\n\n`);
  messages.pop();
}