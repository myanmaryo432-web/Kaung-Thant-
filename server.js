import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BOT_TOKEN = "7771758880:AAEIXJVbDJ5UeYGjbeBAT6KFxeJPaO6VyzE";
let users = new Set();

// Telegram Bot Webhook Receiver
app.post("/webhook", (req, res) => {
  const message = req.body.message;
  if (message) {
    users.add(message.chat.id);
  }
  res.sendStatus(200);
});

// Web Login → Telegram Sender
app.post("/send", async (req, res) => {
  const { username, userid } = req.body;

  for (let chat of users) {
    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${chat}&text=📥 NEW LOGIN\nName: ${username}\nID: ${userid}`
    );
  }

  res.json({ ok: true });
});

app.listen(3000, () => console.log("Server Running"));
