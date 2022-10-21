import { Pagination } from "@discordx/pagination";
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, Slash } from "discordx";
import { getMaps } from "../api";
import { mapsType } from "../types/maps";
@Discord()
export class Maps {
  @Slash({
    description: "Liste des maps de Valorant",
    name: "maps",
  })
  async maps(command: CommandInteraction): Promise<void> {
    if (command.deferred || command.replied) return;
    getMaps("fr-FR").then((maps: mapsType) => {
      new Pagination(
        command,
        maps.data.map((map) => {
          const embed = new EmbedBuilder()
            .setImage(map.displayIcon)
            .setTitle(map.displayName)
            .setColor("#FF0000");
          return {
            embeds: [embed],
            content:
              "Page " + (maps.data.indexOf(map) + 1) + "/" + maps.data.length,
          };
        })
      ).send();
    });
  }
}
