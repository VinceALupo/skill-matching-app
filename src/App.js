

// src/App.js
import React, { useState } from 'react';
import './styles.css';
import PersonInput from './PersonInput';
import ActivityInput from './ActivityInput';
import MatchResult from './MatchResult';
import { useSelector, useDispatch } from 'react-redux';
import { addPerson, editPerson } from './features/peopleSlice';
import { addActivity, editActivity } from './features/activitiesSlice';

function App() {
  // Retrieve people and activities from the Redux store
  const people = useSelector((state) => state.people);
  const activities = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  // Track the person/activity currently being edited
  const [editingPersonIndex, setEditingPersonIndex] = useState(null);
  const [editingActivityIndex, setEditingActivityIndex] = useState(null);

  // State for toggling visibility of people list
  const [isPeopleListVisible, setIsPeopleListVisible] = useState(false);
  const [isActivityListVisible, setIsActivityListVisible] = useState(false);

  // Add or edit person in Redux store
  const savePerson = (name, skills) => {
    if (editingPersonIndex !== null) {
      // Update an existing person
      dispatch(editPerson({ index: editingPersonIndex, person: { name, skills } }));
      setEditingPersonIndex(null); // Exit edit mode after saving
    } else {
      // Add a new person
      dispatch(addPerson({ name, skills }));
    }
  };

  // Add or edit activity in Redux store
  const saveActivity = (title, requiredSkills) => {
    if (editingActivityIndex !== null) {
      // Update an existing activity
      dispatch(editActivity({ index: editingActivityIndex, activity: { title, requiredSkills } }));
      setEditingActivityIndex(null); // Exit edit mode after saving
    } else {
      // Add a new activity
      dispatch(addActivity({ title, requiredSkills }));
    }
  };

  // Set a person to be edited
  const editPersonByIndex = (index) => {
    setEditingPersonIndex(index);
  };

  // Set an activity to be edited
  const editActivityByIndex = (index) => {
    setEditingActivityIndex(index);
  };

  // Toggle people list visibility
  const togglePeopleListVisibility = () => {
    setIsPeopleListVisible(!isPeopleListVisible);
  };

  // Toggle activity list visibility
  const toggleActivityListVisibility = () => {
    setIsActivityListVisible(!isActivityListVisible);
  };

  // Match people to activities based on skills
  const matchPeopleToActivities = () => {
    return activities.map(activity => {
      const matchedPeople = people.filter(person =>
        person.skills.some(skill => activity.requiredSkills.includes(skill))
      );
      return {
        activity: activity.title,
        people: matchedPeople.map(p => p.name)
      };
    });
  };

  return (
    <div className="App">
      <h1>Match People with Activities</h1>

      {/* Input component for adding/editing people */}
      <PersonInput
        addPerson={savePerson}
        editingPerson={editingPersonIndex !== null ? people[editingPersonIndex] : null}
      />

      {/* Toggle button for collapsing/expanding people list */}
      <h2>
        People List
        <button onClick={togglePeopleListVisibility}>
          {isPeopleListVisible ? '-' : '+'}
        </button>
      </h2>

      {isPeopleListVisible && (
        <div>
          {people.length === 0 ? (
            <p>No people added yet.</p>
          ) : (
            <ul>
              {people.map((person, index) => (
                <li key={index}>
                  {person.name} - Skills: {person.skills.join(', ')}
                  <button onClick={() => editPersonByIndex(index)}>Edit</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Input component for adding/editing activities */}
      <ActivityInput
        addActivity={saveActivity}
        editingActivity={editingActivityIndex !== null ? activities[editingActivityIndex] : null}
      />

      {/* Toggle button for collapsing/expanding activity list */}
      <h2>
        Activity List
        <button onClick={toggleActivityListVisibility}>
          {isActivityListVisible ? '-' : '+'}
        </button>
      </h2>

      {/* Collapsible activity list */}
      {isActivityListVisible && (
        <div>
          {activities.length === 0 ? (
            <p>No activities added yet.</p>
          ) : (
            <ul>
              {activities.map((activity, index) => (
                <li key={index}>
                  {activity.title} - Required Skills: {activity.requiredSkills.join(', ')}
                  <button onClick={() => editActivityByIndex(index)}>Edit</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Display match results */}
      <MatchResult matchPeopleToActivities={matchPeopleToActivities()} />
    </div>
  );
}

export default App;


