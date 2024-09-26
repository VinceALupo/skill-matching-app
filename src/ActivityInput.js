
// src/ActivityInput.js
import React, { useState, useEffect } from 'react';

function ActivityInput({ addActivity, editingActivity }) {
  const [title, setTitle] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');

  // If editing, pre-fill the form with the selected activity's details
  useEffect(() => {
    if (editingActivity) {
      setTitle(editingActivity.title);
      setRequiredSkills(editingActivity.requiredSkills.join(', '));
    } else {
      setTitle('');
      setRequiredSkills('');
    }
  }, [editingActivity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = requiredSkills.split(',').map(skill => skill.trim());
    addActivity(title, skillsArray);
    setTitle('');
    setRequiredSkills('');
  };

  return (
    <div>
      <h2>{editingActivity ? 'Edit Activity' : 'Add Activity'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Required Skills (comma separated)"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
        />
        <button type="submit">{editingActivity ? 'Save Changes' : 'Add Activity'}</button>
      </form>
    </div>
  );
}

export default ActivityInput;


 