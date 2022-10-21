import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import API from "./api";
import Locales from "./api/utils/locales";
import Regions from "./api/utils/regions";
import { config } from "./utils/config";

export const bot = new Client({
  // To use only guild command
  // botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {
  // Make sure all guilds are cached
  // await bot.guilds.fetch();

  // Synchronize applications commands with Discord
  await bot.initApplicationCommands();

  // To clear all guild commands, uncomment this line,
  // This is useful when moving from guild commands to global commands
  // It must only be executed once
  //
  //  await bot.clearApplicationCommands(
  //    ...bot.guilds.cache.map((g) => g.id)
  //  );

  console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  // @ts-ignore
  await importx(__dirname + "/{events,commands}/**/*.{ts,js}");
  // Let's start the bot
  if (!config.botToken) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  const api = "GAPI-151f881b-64fd-4f5b-aaed-f44337ce855d";
  const valorant = new API(Regions.NA, api, Regions.AMERICAS);
  valorant.content
    .get(Locales["en-US"])
    .then((content) => {
      const data = content.maps.map((map) => map.name);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // Log in with your bot token
  await bot.login(config.botToken);
}

run();
