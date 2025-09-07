import { ProjectI } from "../../model/types";

interface Props {
  projectData: ProjectI | null;
}

export const ProjectView = ({ projectData }: Props) => {
  return <div className="project-view">{projectData?.name}</div>;
};
