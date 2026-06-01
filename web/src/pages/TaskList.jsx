import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { Callout, Checkbox, ContainedList, ContainedListItem, IconButton, InlineLoading, Search, Stack, Tag } from '@carbon/react';
import { CheckboxChecked, TrashCan } from '@carbon/react/icons';

import { deleteTask, fetchTasks, updateTask } from '../services/taskService';

export default function TaskList() {

  const [tasks, setTasks]  = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError]  = useState(null);

  
  /**
   * Challenge F-2: Add filtering by title and status using the search and checkbox components.
   */
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (event) => {
  };

  const handleIncludeDoneChange = (checked) => {
  };

  useEffect(() => {
    setLoading(true);
    fetchTasks().then(data => {
      setTasks(data);
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [searchParams]);

  /**
   * Challenge F-1: This calls the API correctly but does nothing to update local state afterward.
   */
  const handleMarkDone = async (taskId) => {
    try {
      await updateTask(taskId, { status: 'DONE' });
      // TODO: update local state so the UI reflects the change
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Challenge F-1: This calls the API correctly but does nothing to update local state afterward.
   */
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      // TODO: update local state so the UI reflects the change
    } catch (err) {
      setError(err.message);
    }
  }

  return (<>
    <Stack gap={5}>
      <h1>Tasks</h1>
      <Search
        placeholder="Search by title"
        value={searchParams.get("search")}
        onChange={handleSearchChange}
        closeButtonLabelText="Clear search input"
      />
      <Checkbox
        id="checkbox"
        labelText="Include Done tasks?"
        checked={searchParams.get("includeDone") === "true"}
        onChange={(_, { checked }) => handleIncludeDoneChange(checked)}
      />
      {loading && <InlineLoading description="Loading tasks..." />}
      {(!loading && tasks.length === 0) && <p>No tasks found.</p>}
      {(!loading && tasks.length > 0) && <ContainedList>
        {tasks.map(task => <ContainedListItem key={task.id} action={<>
            {task.status !== "DONE" && <IconButton name="mark as done" label="Mark as done" kind="primary" onClick={() => handleMarkDone(task.id)}>
              <CheckboxChecked />
            </IconButton>}
            <IconButton name="delete" label="Delete" kind="secondary" onClick={() => handleDeleteTask(task.id)}>
              <TrashCan />
            </IconButton>
          </>}>
          <Stack gap={3}>
            <span>
              {task.title} <Tag>{task.status}</Tag> <Tag>{task.priority}</Tag>
            </span>
            <span className="small">{task.description}</span>
            {task.dueDate && <span><Tag>Due: {task.dueDate}</Tag></span>}
          </Stack>
        </ContainedListItem>)}
      </ContainedList>}
      {error && <Callout kind="error">Error: {error}</Callout>}
    </Stack>
  </>);
}