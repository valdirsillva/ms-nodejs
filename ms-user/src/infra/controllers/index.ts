import { PurchaseUser } from "../../application/usecases/purchase-user";
import { PrismaUserRepository } from "../database/prisma/repositories/prisma-user-repository";
import { Producer } from "../messaging/rabbitMQ/producer";
import { CreateUserController } from "./create-user.controller";
import { PurchaseUserController } from "./purchase-user.controller";

const messageQueue = new Producer()
const prismaUserRepository = new PrismaUserRepository();
const purchaseUser = new PurchaseUser(prismaUserRepository, messageQueue);
const purchaseUserController = new PurchaseUserController(purchaseUser);
const createUserController = new CreateUserController(purchaseUser);

export { purchaseUserController, createUserController }