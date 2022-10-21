import { Pagination } from "@discordx/pagination";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import Valorant, { Regions } from "unofficial-valorant-api";
@Discord()
export class MatchHistory {
  @Slash({
    description: "Historique des matchs",
    name: "match",
  })
  async MatchHistory(
    @SlashOption({
      description: "Region",
      name: "region",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    region: Regions,
    @SlashOption({
      description: "Riot ID",
      name: "riot-id",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    name: string,
    @SlashOption({
      description: "Riot Tag",
      name: "riot-tag",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    tag: string,
    command: CommandInteraction
  ): Promise<void> {
    const api = new Valorant();
    if (command.deferred || command.replied) return;
    api.getMMRHistory({ name, tag, region }).then((mmr: any) => {
      console.log(mmr);
      const formatedDate = (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${
          dateObj.getMonth() + 1
        }/${dateObj.getFullYear()} à ${dateObj.getHours()}:${dateObj.getMinutes()}`;
      };

      new Pagination(
        command,
        mmr.data.map((match: any) => {
          const embed = new EmbedBuilder()
            .setTitle("Historique des matchs")
            .setDescription(`**${match.currenttier}**`)
            .setThumbnail(match.images.icon)
            .addFields([
              {
                name: "Elo",
                value: `${match.elo}`,
                inline: true,
              },
              {
                name: "Rang",
                value: `${match.currenttierpatched}`,
                inline: true,
              },
              {
                name: "Changement MMR",
                value: `${match.mmr_change_to_last_game}`,
                inline: true,
              },
              {
                name: "Date",
                value: `${formatedDate(match.date)}`,
                inline: true,
              },
            ]);
          return {
            embeds: [embed],
          };
        })
      ).send();
    });
  }
}
