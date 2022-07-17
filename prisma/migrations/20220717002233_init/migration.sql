-- CreateEnum
CREATE TYPE "TickerType" AS ENUM ('GITHUB_REPO_STARS', 'GITHUB_REPO_FORKS', 'GITHUB_REPO_ISSUES', 'GITHUB_FOLLOWERS', 'TWITCH_FOLLOWERS', 'YOUTUBE_SUBSCRIBERS', 'YOUTUBE_VIEWCOUNT', 'DISCORD_MEMBERS', 'DISCORD_MEMBERS_ROLE', 'DISCORD_HUMANS', 'DISCORD_BOOSTS', 'DISCORD_BOTS', 'REDDIT_SUBSCRIBERS', 'OPENSEA_COLLECTION_FLOOR', 'OPENSEA_COLLECTION_VOLUME', 'OPENSEA_COLLECTION_UNIQUE_HOLDERS', 'OPENSEA_COLLECTION_SUPPLY', 'TWITTER_FOLLOWERS', 'SELF_TICKERS', 'SELF_GUILDS');

-- CreateTable
CREATE TABLE "Ticker" (
    "channel_id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "type" "TickerType" NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "refresh_after" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "format" TEXT NOT NULL,
    "platform_id" TEXT,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("channel_id")
);

-- CreateTable
CREATE TABLE "Preset" (
    "name" TEXT NOT NULL,
    "format" TEXT NOT NULL,

    CONSTRAINT "Preset_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "guild_id" TEXT,
    "feedback" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticker_channel_id_key" ON "Ticker"("channel_id");

-- CreateIndex
CREATE UNIQUE INDEX "Preset_format_key" ON "Preset"("format");
