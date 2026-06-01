import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, DatePicker, DatePickerInput, Form, Heading, Select, SelectItem, Stack, TextArea, TextInput } from '@carbon/react';

import { createTask } from '../services/taskService';

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export default function CreateTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDueDateChange = (e) => {
    setForm(prev => ({ ...prev, dueDate: e[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Challenge F-3: Run client-side validation before calling the API

    try {
      await createTask(form);
      navigate('/');
    } catch (error) {
      // Challenge F-3: Parse error.body and display field-level errors,
      // instead of just a generic alert
      alert('Failed to create task');
    }
  };

  return (<>
    <Form onSubmit={handleSubmit}>
      <Stack gap={5}>
        <Heading>Create Task</Heading>
        <TextInput name="title" required={true} labelText="Title *" placeholder="Insert title here" value={form.title} onChange={handleChange} />
        
        <TextArea name="description" labelText="Description" placeholder="Insert description here" rows={4} value={form.description} onChange={handleChange} />

        <Stack gap={6} orientation="horizontal">
          <Select name="priority" required={true} labelText="Priority *" value={form.priority} onChange={handleChange}>
            <SelectItem disabled hidden value="" text="Choose a priority" />
            {PRIORITIES.map(p => <SelectItem key={p} value={p} text={p} />)}
          </Select>

          {/* Challenge F-3: Validate date (must not be in the past) */}
          <DatePicker name="dueDate" datePickerType="single" value={form.dueDate} onChange={handleDueDateChange}>
            <DatePickerInput name="dueDate" labelText="Due Date" placeholder="mm/dd/yyyy" />
          </DatePicker>
        </Stack>

        {/* Challenge F-3: Show "Saving…" and disable the button when requesst in in-flight */}
        <Button type="submit">
          Create Task
        </Button>
      </Stack>
    </Form>
  </>);
}