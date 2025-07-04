// import { PrismClient } from "@prisma/client"; 
// we do the above when we dont specify an output directory in schema.prisma
import { PrismaClient } from "../generated/prisma";

export default new PrismaClient();