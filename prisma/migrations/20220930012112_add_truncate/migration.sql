-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TickerType" ADD VALUE 'TIKTOK_FOLLOWERS';
ALTER TYPE "TickerType" ADD VALUE 'INSTAGRAM_FOLLOWERS';
ALTER TYPE "TickerType" ADD VALUE 'ROBLOX_FOLLOWERS';
ALTER TYPE "TickerType" ADD VALUE 'ROBLOX_GROUP_MEMBERS';
ALTER TYPE "TickerType" ADD VALUE 'ROBLOX_FRIENDS';

-- AlterTable
ALTER TABLE "Ticker" ADD COLUMN     "truncate" BOOLEAN NOT NULL DEFAULT false;
