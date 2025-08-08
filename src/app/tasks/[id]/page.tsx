import TaskDetail from "@/components/TaskDetail";

interface TaskDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { id } = await params;
  return <TaskDetail taskId={id} />;
}
