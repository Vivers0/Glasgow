const { Client } = require('discord.js')
const { Jikan } = require('./app/Jikan')
const client = new Client()

const { token, prefix } = require('./config.json') 

client.login(token)

client.on('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    const [cmd, ...args] = message.content.slice(prefix.length).split(/ +/);
    new Jikan(cmd, { args, message })
})