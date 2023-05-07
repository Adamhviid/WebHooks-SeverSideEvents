import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = new sqlite3.Database('./webhooks.db')

async function getSubscribers() {
  let users = [];
  const db = await openDb();
  users = await db.all("SELECT url FROM Users");
  await db.close();
  return users
}

async function subscribe(username, url) {
  const db = await openDb();
  await db.run("INSERT INTO Users (username, url) VALUES (?,?)", [username, url]);
  await db.close();
  console.log(`subscribed user: ${"username", username}`);
}

async function unsubscribe(username) {
  const db = await openDb();
  await db.run("DELETE FROM Users WHERE username = ?", [username]);
  await db.close();
  console.log(`unsubscribed user: ${"username", username}`);
}

async function openDb() {
  return open({
    filename: "webhooks.db",
    driver: sqlite3.Database,
  });
}

export { subscribe, getSubscribers, unsubscribe }