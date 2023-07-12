import { IPaginationData, IProjectsData } from './ProjectsScreen';
import ProjectsAllProjectsTable from './ui-elements/ProjectsAllProjectsTable';

interface ProjectsAllProjectsTabProps {
    projectsData: IProjectsData;
    paginationData: IPaginationData;
}

const ProjectsAllProjectsTab = ({ projectsData, paginationData }: ProjectsAllProjectsTabProps) => (
    <ProjectsAllProjectsTable projectsData={projectsData} paginationData={paginationData} />
);

ProjectsAllProjectsTab.displayName = 'ProjectsAllProjectsTab';

export default ProjectsAllProjectsTab;
