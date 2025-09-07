import { ProjectI } from "@/entities/project";
import styles from "./styles.module.css";

interface Props {
  project: ProjectI;
  handleClick: () => void;
}

export const Project = ({ project, handleClick }: Props) => {
  return (
    <div className={styles["project"]} onClick={handleClick}>
      {project.id}
    </div>
  );
};
