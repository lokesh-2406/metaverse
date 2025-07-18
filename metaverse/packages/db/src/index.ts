// import { PrismClient } from "@prisma/client";
// we do the above when we dont specify an output directory in schema.prisma
// import { PrismaClient } from "@prisma/client";

// export default new PrismaClient();

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export { PrismaClient } from "@prisma/client"; // this fixed the issue with objects not being recognized in the IDE
