import { Pagination } from "@discordx/pagination";
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import { Locales } from "../api/locales";
import { Regions } from "../api/regions";
import API from "../api";

@Discord()
export class SlashExample {
  @Slash({
    description: "Pagination for all slash command",
    name: "all-commands",
  })
  async pages(interaction: CommandInteraction): Promise<void> {
    const api = "GAPI-151f881b-64fd-4f5b-aaed-f44337ce855d";
    const valorant = new API(Regions.NA, api, Regions.AMERICAS);
    valorant.content.get(Locales["en-US"]).then((content) => {
      console.log(
        content.characters.map((char) => {
          return char.name;
        })
      );
    });
    const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
      return { description: cmd.description, name: cmd.name };
    });

    const pages = commands.map((cmd, i) => {
      const embed = new EmbedBuilder()
        .setFooter({ text: `Page ${i + 1} of ${commands.length}` })
        .setTitle("**Slash command info**")
        .addFields({ name: "Name", value: cmd.name })
        .addFields({ name: "Description", value: cmd.description });

      return { embeds: [embed] };
    });

    const pagination = new Pagination(interaction, pages);
    await pagination.send();
  }
}
