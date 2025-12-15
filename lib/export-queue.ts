import { Queue } from "bullmq"
import { redisConnection } from "./redis"

export const exportQueue = new Queue("csv-exports", {
  connection: redisConnection,
})
