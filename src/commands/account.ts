import {
  ApplicationCommandOptionType,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import Valorant from "unofficial-valorant-api";
@Discord()
export class Account {
  @Slash({
    description: "Ton compte Valorant",
    name: "account",
  })
  async Account(
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
    type Account = {
      puuid: string;
      region: string;
      account_level: number;
      name: string;
      tag: string;
      card: {
        small: string;
        large: string;
        wide: string;
        id: string;
      };
      last_updated: string;
      last_update_raw: string;
    };
    api.getAccount({ name, tag }).then((account) => {
      const accountData = account.data as Account;
      if (accountData === undefined) {
        command.reply("Le compte n'existe pas !");
        return;
      }
      const embed = new EmbedBuilder()
        .setTitle(`Compte Valorant de ${accountData.name}#${accountData.tag}`)
        .setFields([
          {
            name: "Pseudo Riot",
            value: accountData.name + "#" + accountData.tag,
            inline: true,
          },
        ])
        .addFields([
          {
            name: "Niveau",
            value: accountData.account_level.toString(),
            inline: true,
          },
        ])
        .setImage(accountData.card.wide)
        .setTimestamp(parseInt(accountData.last_updated));
      command.reply({
        embeds: [embed],
      });
    });
  }
}
