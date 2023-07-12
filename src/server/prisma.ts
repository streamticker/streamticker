import {PrismaClient} from '@prisma/client';

const getPrisma = () => new PrismaClient();

// @ts-expect-error - this is alistair's fault
// eslint-disable-next-line no-multi-assign
export const prisma: ReturnType<typeof getPrisma> = (globalThis.__prisma__ = getPrisma());
