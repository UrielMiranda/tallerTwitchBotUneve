
const opts = {
  identity: {
    username: "tuUserName", // tu username de twitch va aqui
    password: "password" // Para obtener tu password entra aquí: https://twitchapps.com/tmi/
  },
  channels: [
    "tuUserName" //tu username de twitch va aqui
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
async function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot
 
  // Remove whitespace from chat message
  // const commandName = msg.trim();
  // 
  
  const texto = msg.split(" ");
  const commandName = texto.shift();
  const query = texto.join(" ");

  // if (commandName === "!youtube") {
  //   console.log("te lo debo")
  // }
  // If the command is known, let's execute it
  if (commandName === "!gif") {
     const response = await getGif(query);
     const imgURL = response.data[0].images.downsized.url;
     createIMG(imgURL);
    // const num = rollDice();
    // client.say(target, `You rolled a ${num}`);
    // console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

async function getGif(query){
//
const apikey = "" // Aqui va tu api key de ghipy, aca lo encuentras: https://developers.giphy.com
 const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${query}&limit=25&offset=0&rating=g&lang=en`
 const response = await fetch(url);
 return response.json();
}
// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function createIMG(url){
  const gif = document.querySelector("#gif");
  const img = document.createElement("img");
  img.src = url;
  gif.appendChild(img);

  setTimeout(function(){
    const nodeimg = document.querySelector("img");
    nodeimg.parentElement.removeChild(nodeimg)
  },3000)
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
