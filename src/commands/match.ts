import { Pagination } from "@discordx/pagination";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import Valorant, { Regions } from "unofficial-valorant-api";
import { mmrHistoryType } from "../types/mmrHistory";
@Discord()
export class MatchHistory {
  @Slash({
    description: "Historique des matchs",
    name: "history-ranked",
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
    named: string,
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
    const name = named.replace(/%20/g, " ");
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
        mmr.data.map((match: mmrHistoryType) => {
          if (match.currenttier === null) {
            command.reply(
              "Vous n'avez pas encore joué de matchs classés sur cette région."
            );
            return;
          }
          let emoji = "";
          switch (match.currenttier) {
            case "iron":
              match.currenttier = "Fer";
              emoji = "<:iron:879100202100469800>";
              break;
            case "bronze":
              match.currenttier = "Bronze";
              emoji = "<:bronze:879100202100469800>";
              break;
            case "silver":
              match.currenttier = "Argent";
              emoji = "<:silver:879100202100469800>";
              break;
            case "gold":
              match.currenttier = "Or";
              emoji = "<:gold:879100202100469800>";
              break;

            case "Gold 1":
              match.currenttier = "Or 1";
              emoji = "<:gold:879100202100469800>";
              break;
            case "platinum":
              match.currenttier = "Platine";
              emoji = "<:platinum:879100202100469800>";
              break;
            case "diamond":
              match.currenttier = "Diamant";
              emoji = "<:diamond:879100202100469800>";
              break;
            case "immortal":
              match.currenttier = "Immortel";
              emoji = "<:immortal:879100202100469800>";
              break;
            case "ascendant":
              match.currenttier = "Ascendant";
              emoji = "<:ascendant:879100202100469800>";
              break;
            case "radiant":
              match.currenttier = "Radiant";
              emoji = "<:radiant:879100202100469800>";
              break;
          }
          const embed = new EmbedBuilder()
            .setTitle("Historique des matchs")
            .setDescription(`**${match.currenttier}**`)
            .setThumbnail(match.images.icon)
            .addFields([
              {
                name: "Elo",
                value: `:star: ${match.elo}`,
                inline: true,
              },
              {
                name: "Rang",
                value: `${emoji} ${match.currenttierpatched}`,
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
