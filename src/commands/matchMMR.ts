import {
  ApplicationCommandOptionType,
  AttachmentBuilder,
  CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { Canvas, createCanvas, loadImage } from "@napi-rs/canvas";
import { getAccount, getMMR } from "../api";
import { AxiosResponse } from "axios";
@Discord()
export class matchMMR {
  @Slash({
    description: "Récupérer les données des matchs MMR",
    name: "match-mmr",
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
    if (command.deferred || command.replied) return;
    type MatchMMR = {
      currenttier: number;
      currenttierpatched: number;
      images: {
        small: string;
        large: string;
        triangle_down: string;
        triangle_up: string;
      };
      ranking_in_tier: number;
      mmr_change_to_last_game: number;
      elo: number;
      name: string;
      tag: string;
      old: boolean;
    };
    type Account = {
      card: {
        small: string;
        large: string;
        wide: string;
        id: string;
      };
    };
    let data = "" as unknown as Account;
    getAccount(name, tag).then(async (response: AxiosResponse) => {
      data = response.data.data;
    });
    getMMR(name, tag).then(async (response: AxiosResponse) => {
      const matchMMRData = response.data.data as MatchMMR;
      if (matchMMRData === undefined) {
        command.reply("Le compte n'existe pas !");
        return;
      }

      const img = await loadImage(data.card.wide);
      const rank = await loadImage(matchMMRData.images.small);
      ctx.drawImage(img, 0, 0, 452, 128);
      ctx.drawImage(rank, 15, 37, 64, 64);
      ctx.fillStyle = "#ffffff";

      ctx.font = "bold 18px Arial";
      ctx.fillText(`${matchMMRData?.name}#${matchMMRData?.tag}`, 140, 55);
      ctx.font = "normal 16px Arial";
      ctx.fillText(`MMR: ${matchMMRData?.elo}`, 140, 75);

      const attachment = new AttachmentBuilder(await canvas.encode("png"));
      command.reply({ files: [attachment] });
    });
  }
}
