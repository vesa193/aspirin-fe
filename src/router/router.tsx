import { Navigate, Route, Routes } from 'react-router-dom';
import AspirinBaseScreen from 'domains/aspirin-base/AspirinBaseScreen';
import DashboardScreen from 'domains/dashboard/DashboardScreen';
import InnerContainer from 'containers/InnerContainer';
import ClientsScreen from 'domains/clients/ClientsScreen';
import ProjectsScreen from 'domains/projects/ProjectsScreen';
import { routerPaths } from './routerPaths';

const MainRouter = () => (
    <Routes>
        <Route path={routerPaths.ROOT} element={<InnerContainer />}>
            <Route path={routerPaths.ROOT} element={<Navigate to={routerPaths.DASHBOARD} />} />
            <Route path={routerPaths.DASHBOARD} element={<DashboardScreen />} />
            <Route path={routerPaths.ASPIRIN_BASE} element={<Navigate to={routerPaths.ASPIRIN_BASE_EMPLOYEES} />} />
            <Route path={routerPaths.ASPIRIN_BASE} element={<AspirinBaseScreen />}>
                <Route path=':tabName' element={<AspirinBaseScreen />} />
            </Route>
            <Route path={routerPaths.PROJECTS} element={<Navigate to={routerPaths.PROJECTS_ALL_PROJECTS} />} />
            <Route path={routerPaths.PROJECTS} element={<ProjectsScreen />}>
                <Route path=':tabName' element={<ProjectsScreen />} />
            </Route>
            <Route path={routerPaths.CLIENTS} element={<ClientsScreen />} />
        </Route>
    </Routes>
);

export default MainRouter;
