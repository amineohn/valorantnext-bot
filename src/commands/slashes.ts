import { Pagination } from "@discordx/pagination";
import type { CommandInteraction, Message } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import Locales from "../api/utils/locales";
import Regions from "../api/utils/regions";
import API from "../api";

@Discord()
export class Valorant {
  @Slash({
    description: "testing Valorant API",
    name: "valorant",
  })
  async valorant(command: CommandInteraction): Promise<void> {
    command.reply("Fetching data...");

    //command.reply("Valorant API is working");
  }
}
