/*
  Warnings:

  - The values [SELF_TICKERS,SELF_GUILDS] on the enum `TickerType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TickerType_new" AS ENUM ('GITHUB_REPO_STARS', 'GITHUB_REPO_FORKS', 'GITHUB_REPO_ISSUES', 'GITHUB_FOLLOWERS', 'TWITCH_FOLLOWERS', 'YOUTUBE_SUBSCRIBERS', 'YOUTUBE_VIEWCOUNT', 'DISCORD_MEMBERS', 'DISCORD_MEMBERS_ROLE', 'DISCORD_HUMANS', 'DISCORD_BOOSTS', 'DISCORD_BOTS', 'REDDIT_SUBSCRIBERS', 'OPENSEA_COLLECTION_FLOOR', 'OPENSEA_COLLECTION_VOLUME', 'OPENSEA_COLLECTION_UNIQUE_HOLDERS', 'OPENSEA_COLLECTION_SUPPLY', 'TWITTER_FOLLOWERS');
ALTER TABLE "Ticker" ALTER COLUMN "type" TYPE "TickerType_new" USING ("type"::text::"TickerType_new");
ALTER TYPE "TickerType" RENAME TO "TickerType_old";
ALTER TYPE "TickerType_new" RENAME TO "TickerType";
DROP TYPE "TickerType_old";
COMMIT;
