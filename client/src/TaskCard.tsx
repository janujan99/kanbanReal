import OutlinedCard from "./Card";

interface TaskCardProps {
  name: string;
  id: number;
  description: string;
}

export default function TaskCard(props: TaskCardProps) {
  return (
    <OutlinedCard
      name={props.name}
      description={props.description}
      id={props.id}
    ></OutlinedCard>
  );
}
