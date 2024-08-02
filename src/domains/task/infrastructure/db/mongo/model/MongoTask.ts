import { TaskStatus } from "../../../../core/model/TaskStatus";
import { Message } from "../../../../../../common/entities/Message";
import { Primitive } from "../../../../../../common/types/types";

export interface MongoTask {
  _id: string;
  name: string;
  description: string;
  status: TaskStatus;
  epicId: string;
  sprintId: string;
  stageId: string;
  authorId: string;
  executorId: string;
  projectId: string;
  messages: Message[] | null;
  [key: string]: any;
}
