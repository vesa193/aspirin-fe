import { Box, Tab } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import Heading from 'ui-components/src/heading/Heading';
import TabBar from 'ui-components/src/tab/TabBar';
import TabPanel from 'ui-components/src/tab/TabPanel';
import { usePagination } from 'hooks/usePagination';
import ProjectsAllProjectsTab from './ProjectsAllProjectsTab';
import ProjectsSavedProjectsTab from './ProjectsSavedProjectsTab';
import ProjectsTabs from './projectsTabs';
import { useProjects } from './hooks/useProjects';
import { IProject } from './ui-elements/ProjectsAllProjectsTableTypes';

export interface IProjectData {
    totalCount: number;
    values: IProject[];
}

export interface IProjectsData {
    projects: IProjectData;
    isLoadingProjects: boolean;
    isFetchingProjects: boolean;
}

export interface IPaginationData {
    page: number;
    rowsPerPage: number;
    handleChangePage: () => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>, pageNumber: number) => void;
}

const ProjectsScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const tabIntialState = location.pathname.split('/')[2] || ProjectsTabs.ALL_PROJECTS;
    const [tabId, setTabId] = useState(tabIntialState);
    const [searchParams] = useSearchParams();
    const pageNumber = searchParams.get('page') ? +searchParams.get('page')! - 1 : 0;
    const pageSize = searchParams.get('pageSize') ? +searchParams.get('pageSize')! : 10;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(pageNumber, pageSize);
    const {
        isLoading: isLoadingProjects,
        data: projects,
        isFetching: isFetchingProjects,
    } = useProjects('', page, rowsPerPage);

    useEffect(() => {
        setTabId(tabIntialState);
    }, [location.pathname]);

    const handleChangeTab = (_event: SyntheticEvent, newTabValue: string) => {
        setTabId(newTabValue);
    };

    const handleClickTab = (path: string) => {
        navigate(path);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Heading title='Projects'>List of all available projects inside Aspirin</Heading>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 170px', gap: 6 }}>
                <TabBar activeTabId={tabId} handleChangeTab={handleChangeTab} tabBarName='projects-tabs'>
                    <Tab
                        id={`projects-tab-${ProjectsTabs.ALL_PROJECTS}`}
                        value={ProjectsTabs.ALL_PROJECTS}
                        sx={{ textTransform: 'capitalize' }}
                        label='All projects'
                        onClick={() => handleClickTab(ProjectsTabs.ALL_PROJECTS)}
                    />
                    <Tab
                        value={ProjectsTabs.SAVED_PROJECTS}
                        sx={{ textTransform: 'capitalize' }}
                        label='Saved projects'
                        id={`projects-tab-${ProjectsTabs.SAVED_PROJECTS}`}
                        onClick={() => handleClickTab(ProjectsTabs.SAVED_PROJECTS)}
                    />
                </TabBar>
                {tabId === ProjectsTabs.ALL_PROJECTS ? (
                    <BaseButton color='primary' startIcon label='New project' />
                ) : (
                    <BaseButton color='primary' startIcon label='Saved project' onClick={() => {}} />
                )}
            </Box>
            <TabPanel value={tabId} index={ProjectsTabs.ALL_PROJECTS}>
                <ProjectsAllProjectsTab
                    projectsData={{ projects, isLoadingProjects, isFetchingProjects } as IProjectsData}
                    paginationData={{ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } as IPaginationData}
                />
            </TabPanel>
            <TabPanel value={tabId} index={ProjectsTabs.SAVED_PROJECTS}>
                <ProjectsSavedProjectsTab />
            </TabPanel>
        </Box>
    );
};

ProjectsScreen.displayName = 'AspirinBaseScreen';

export default ProjectsScreen;
