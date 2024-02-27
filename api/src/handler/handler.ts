import { FastifyReply } from "fastify";
import parseResponse from "./response.js";
import errorHandler from "./error.js";
import { verifySession } from "supertokens-node/lib/build/recipe/session/framework/fastify.js";
import { ResponseInterface } from "./types.js";

export const sessionHandler = (_req, _res, done) => {
  process.env.NODE_ENV === "production" ? verifySession() : done();
};

export const responseSender = async (
  data: ResponseInterface,
  reply: FastifyReply,
): Promise<void> => {
  await errorHandler.reply(data, reply);
  console.log(data);
  return reply.send(data);
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
