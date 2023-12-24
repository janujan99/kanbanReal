import { FrontEndTask } from "../../kanbanTypes";
import OutlinedCard from "./Card";
import useStore from "./store";

interface TaskCardProps {
  task: FrontEndTask;
}

export default function TaskCard(props: TaskCardProps) {
  const store = useStore();
  return (
    <div onClick={() => store.toggleTaskEditorModal()}>
      <OutlinedCard
        name={props.task.title}
        description={props.task.description}
        id={props.task.id}
        subTasks={props.task.subTasks}
      ></OutlinedCard>
    </div>
  );
}
