import { useMemo, useState } from "react";

import { ProjectI, ProjectView } from "@/entities/project";
import { projectsData } from "@/entities/project";
import styles from "./styles.module.css";
import { SliderProjects } from "@/features/SliderProjects";
import { Project } from "@/entities/project";
import { Modal } from "@/shared/ui/";

export const DemoMode = () => {
    const [selectedProject, setSelectedProject] = useState<ProjectI | null>(
        null
    );
    const [visible, setVisible] = useState<boolean>(false);

    const handleProjectClick = (project: ProjectI) => {
        setSelectedProject({ ...project });
        setVisible(true);
    };

    const projects = useMemo(() => {
        return projectsData.map((project) => (
            <Project
                key={project.id}
                project={project}
                handleClick={() => handleProjectClick(project)}
            />
        ));
    }, []);

    return (
        <div>
            <h2 className={styles["title"]}>Демо режим</h2>
            <SliderProjects items={projects} />
            <Modal visible={visible} setVisible={setVisible}>
                <ProjectView projectData={selectedProject} />
            </Modal>
        </div>
    );
};
