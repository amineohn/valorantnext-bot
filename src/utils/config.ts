import { validateEnv } from "./validateEnv";

export const config = {
  botToken: validateEnv(
    "BOT_TOKEN",
    "MTAzMjY4OTk5OTk5NDQzNzc0NQ.G538jy.59X-07c-zUMsXbaH84Fx2EocdB-3SzlOfJ6zaM"
  ),
} as const;
