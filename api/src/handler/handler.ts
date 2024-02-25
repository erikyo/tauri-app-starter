import { FastifyReply } from "fastify";
import parseResponse from "./response.js";
import errorHandler from "./error.js";
import { ResponseInterface } from "../model/types.js";

export const responseSender = async (
  data: ResponseInterface,
  reply: FastifyReply,
): Promise<void> => {
  await errorHandler.reply(data, reply);
  reply.send(data);
};

const responseHandler = async (
  next: Function,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const data: ResponseInterface = await next();
    return responseSender(parseResponse(data), reply);
  } catch (error) {
    return responseSender(parseResponse(error), reply);
  }
};

export default responseHandler;
