import { getSubscribers, subscribe, unsubscribe } from "./database.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post('/subscribe', (req, res) => {
  subscribe(req.body.username, req.body.url)
  res.sendStatus(200);
});

app.post('/unsubscribe', (req, res) => {
  unsubscribe(req.body.username)
  res.sendStatus(200);
});

//interval to send messages to webhooks
setInterval(async () => {
  const users = await getSubscribers()
  if (users.length === 0) return;
  /* console.log(`${users.length} subscribers found`); */

  users.forEach(async (user) => {
    try {
      await fetch(user.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generateStocks()),
      });
    } catch (err) {
      console.error(err.message);
    }
  });
}, 3500);

function generateStocks() {
  const stocks = [{ ticker: "AAPL", price: 0 }, { ticker: "AMZN", price: 0 }, { ticker: "GOOG", price: 0 }, { ticker: "FB", price: 0 }, { ticker: "TSLA", price: 0 }]
  stocks.forEach((stock) => {
    stock.price = `$${Math.floor(Math.random() * 1000)}`
  });
  return stocks;
}


app.listen(8000, () => console.log('Node.js server started on port 8000.'));