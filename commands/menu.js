const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { scrap_menu } = require("../lib/scrap");
const choices = [
    ["Forum", "https://www.crous-orleans-tours.fr/restaurant/le-forum/"],
    ["Lac", "https://www.crous-orleans-tours.fr/restaurant/le-lac/"],
    ["Anatide", "https://www.crous-orleans-tours.fr/restaurant/lanatide/"],
    ["Pizzeria", "https://www.crous-orleans-tours.fr/restaurant/pizzeria-le-borsalino/"],
    ["Bite", "Bite"]
]
const stringOption = new SlashCommandStringOption()
    .setName('nom')
    .setDescription('nom du restau')
    .setRequired(true)

for (const [choice, url] of choices) {
    stringOption.addChoices({name : choice, value : url})
}

const menu = new SlashCommandBuilder()
    .setName("menu")
    .setDescription("infos pour les menus")
    .addStringOption(stringOption)

module.exports = {
    data: menu,
    async execute(interaction){
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'menu'){
            if (interaction.user.username == "PsyKaze#1548") return
            if (interaction.options.getString('nom') === "Bite"){
                await interaction.reply("le menu du jour a 'la bite' est : \n \n    - queue🍆🍆")
                return;
            }
            await interaction.deferReply();
            await interaction.editReply(await scrap_menu(interaction.options.getString('nom')))
            return;
            
        }
    }
}