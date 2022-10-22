import {
  ApplicationCommandOptionType,
  AttachmentBuilder,
  CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import Valorant from "unofficial-valorant-api";
import { Canvas, createCanvas, loadImage } from "@napi-rs/canvas";
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
    const canvas = createCanvas(452, 128) as Canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1280, 720);
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
    api.getAccount({ name, tag }).then(async (account) => {
      const accountData = account.data as Account;
      if (accountData === undefined) {
        command.reply("Le compte n'existe pas !");
        return;
      }

      const background = await loadImage(accountData.card.wide);

      ctx.drawImage(background, 0, 0, 452, 128);

      ctx.font = "normal 20px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 0;
      ctx.shadowColor = "black";
      ctx.fillText(`${accountData.name}#${accountData.tag}`, 452 / 2, 128 / 2);
      ctx.fillText(
        `Niveau ${accountData.account_level}`,
        452 / 2,
        128 / 2 + 20
      );

      const attachment = new AttachmentBuilder(await canvas.encode("png"), {
        name: "profile-image.png",
      });
      command.reply({
        files: [attachment],
      });
    });
  }
}
