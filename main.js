require('dotenv').config()
const Discord = require("discord.js");

const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

const fetch = require("node-fetch")


//This function utilizes .then to access the json from the api call
// function getQuote() {
//   return fetch("https://zenquotes.io/api/random")
//     .then(res => {
//       return res.json()
//       })
//     .then(data => {
//       return data[0]["q"] + " -" + data[0]["a"]
//     })
// }

//This function utilizaes async await to access the api's data
const getQuote = async() => { 
  try {
    const url = "https://zenquotes.io/api/random";
    const res = await fetch(url);
    console.log(res.ok);
    const data = await res.json();
    return data[0]['q'] + " -" + data[0]['a']
  } catch (err) {
    console.log(err)
  }
}

client.on("message", msg => {
  if (msg.author.bot) return
    
  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }
})

client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === 'what is my avatar') {
    // Send the user's avatar URL
    message.reply(message.author.displayAvatarURL());
  }
});

client.login(process.env.TOKEN)