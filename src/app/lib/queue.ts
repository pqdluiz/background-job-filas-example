import Queue, { Job } from "bull";
import { redisConfig } from "../../config/redis";

import { RegistrationMail, UserReport } from "../jobs";

const registrationMail = new RegistrationMail();
const userReport = new UserReport();

const handle = registrationMail.handle && userReport.handle;
const key = registrationMail.key && userReport.key;
const options = userReport.options;

//const queues = Object.values(jobs).map((job) => ({
//  bull: new Queue(job.key, redisConfig),
//  name: job.key,
//  handle: job.handle,
//  options: job.options,
//}));

const generic = {
  bull: new Queue(key),
  name: key,
  handle: handle,
  options: options,
};

export class QueueConfig {
  constructor(private readonly queue?: typeof generic) {}

  add(name: string, data: object): Promise<Job<any>> {
    //const queue = this.queue.find((queue) => queue.name === name);
    //return queue.bull.add(data, queue.options);

    return this.queue.bull.add(data, this.queue.options);
  }

  process(): void {
    return this.queue.forEach((queue) => {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.key, job.data);
        console.log(err);
      });
    });
  }
}
