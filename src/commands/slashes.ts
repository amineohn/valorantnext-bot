import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";
import Locales from "../api/utils/locales";
import Regions from "../api/utils/regions";
import API from "../api";
import { apiKey } from "../main";
@Discord()
export class Valorant {
  @Slash({
    description: "Liste des maps de Valorant",
    name: "maps",
  })
  async valorant(command: CommandInteraction): Promise<void> {
    if (command.deferred || command.replied) return;

    const valorant = new API(Regions.EU, apiKey, Regions.EUROPE);
    command.reply("Récupération des données...");
    valorant.content
      .get(Locales["en-US"])
      .then((content) => {
        const data = content.maps.map((map) => map.name);
        command.editReply("Données récupérées ! Voici la liste des maps :");
        const embed = new EmbedBuilder()
          .setTitle("Valorant Maps")
          .setDescription("Liste des maps de Valorant")
          .setColor("#FF0000")
          .setFields([
            {
              name: "Map",
              value: data.join("\n"),
              inline: true,
            },
          ])
          .setTimestamp();
        command.editReply({
          embeds: [embed],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
