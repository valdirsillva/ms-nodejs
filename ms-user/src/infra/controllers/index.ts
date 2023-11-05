import { User } from "../../application/usecases/user";
import { PrismaUserRepository } from "../database/prisma/repositories/prisma-user-repository";
import { Producer } from "../messaging/rabbitMQ/producer";
import { CreateUserController } from "./create-user.controller";
import { UserController } from "./user.controller";

const messageQueue = new Producer()
const prismaUserRepository = new PrismaUserRepository();
const userInstance = new User(prismaUserRepository, messageQueue);
const getUserController = new UserController(userInstance);
const createUserController = new CreateUserController(userInstance);

export { getUserController, createUserController }