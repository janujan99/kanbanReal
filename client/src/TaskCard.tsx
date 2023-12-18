import { FrontEndTask } from "../../kanbanTypes";
import OutlinedCard from "./Card";

interface TaskCardProps {
  task: FrontEndTask;
}

export default function TaskCard(props: TaskCardProps) {
  return (
    <div>
      <OutlinedCard
        name={props.task.title}
        description={props.task.description}
        id={props.task.id}
        subTasks={props.task.subTasks}
      ></OutlinedCard>
    </div>
  );
}
