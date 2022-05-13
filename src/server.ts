import "dotenv/config";
import express from "express";
import BullBoard from "bull-board";

import { UserController } from "./app/controllers/user.controller";
import { QueueConfig } from "./app/lib/Queue";

const app = express();
const userRouter = new UserController();
const queueConfig = new QueueConfig();

BullBoard.setQueues(QueueConfig.queues.map((queue) => queue.bull));

app.use(express.json());
app.post("/users", userRouter.store);

app.use("/admin/queues", BullBoard.UI);

app.listen(3333, () => {
  console.log("Server running on localhost:3333");
});
