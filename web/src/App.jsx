import { Routes, Route, Link } from 'react-router';
import { Content, Header, HeaderMenuItem, HeaderName, HeaderNavigation, SkipToContent } from '@carbon/react';

import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';

export default function App() {
  return (<>
      <Header>
        <SkipToContent />
        <HeaderName as={Link} to="/" prefix="ACME">
          Tasks
        </HeaderName>
        <HeaderNavigation>
          <HeaderMenuItem as={Link} to="/">Task List</HeaderMenuItem>
          <HeaderMenuItem as={Link} to="/create">Create Task</HeaderMenuItem>
        </HeaderNavigation>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<CreateTask />} />
        </Routes>
      </Content>
    </>
  );
}