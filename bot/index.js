import dotenv from 'dotenv';
import pkg from 'discord.js';

dotenv.config();
const { Client, Intents, MessageEmbed, ThreadMemberFlags, GuildScheduledEvent, PermissionsBitField} = pkg;
const bot = new Client({ intents: 32767 });
const token = process.env.TOKEN;

console.log("En connexion...");

bot.login(token);