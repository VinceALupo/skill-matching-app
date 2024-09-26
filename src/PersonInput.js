

// src/PersonInput.js
import React, { useState, useEffect } from 'react';

function PersonInput({ addPerson, editingPerson }) {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');

  // If editing, pre-fill the form with the selected person's details
  useEffect(() => {
    if (editingPerson) {
      setName(editingPerson.name);
      setSkills(editingPerson.skills.join(', '));
    } else {
      setName('');
      setSkills('');
    }
  }, [editingPerson]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skills.split(',').map(skill => skill.trim());
    addPerson(name, skillsArray);
    setName('');
    setSkills('');
  };

  return (
    <div>
      <h2>{editingPerson ? 'Edit Person' : 'Add Person'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Person Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button type="submit">{editingPerson ? 'Save Changes' : 'Add Person'}</button>
      </form>
    </div>
  );
}

export default PersonInput;


 