

// src/MatchResult.js
import React from 'react';

function MatchResult({ matchPeopleToActivities }) {
  return (
    <div>
      <h2>Matching Results</h2>
      {matchPeopleToActivities.length === 0 ? (
        <p>No activities or people to match yet.</p>
      ) : (
        matchPeopleToActivities.map((match, index) => (
          <div key={index}>
            <h3>{match.activity}</h3>
            <p>
              {match.people.length > 0
                ? `Matches: ${match.people.join(', ')}`
                : 'No matches'}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MatchResult;


 