import React, { useState } from 'react';
import './App.css';

function App() {
  // State for storing the habits
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  // Initialize the habit statuses and timings for each day
  const [habitData, setHabitData] = useState([]);

  // Function to handle adding a new habit
  const handleAddHabit = () => {
    if (newHabit.trim() !== '') {
      // Add new habit to the habits array
      setHabits([...habits, newHabit]);

      // Add an empty array for habit data
      setHabitData([...habitData, []]);

      // Clear the input field
      setNewHabit('');
    }
  };

  // Function to handle deleting a habit
  const handleDeleteHabit = (index) => {
    // Remove the habit from the habits array
    const updatedHabits = [...habits];
    updatedHabits.splice(index, 1);
    setHabits(updatedHabits);

    // Remove the habit data from the habitData array
    const updatedHabitData = [...habitData];
    updatedHabitData.splice(index, 1);
    setHabitData(updatedHabitData);
  };

  // Function to handle changing the status and timing of a habit for a day
  const handleStatusChange = (habitIndex, dayIndex, status, time) => {
    // Update the habit data for the selected habit and day
    const updatedHabitData = [...habitData];
    const habitDayData = updatedHabitData[habitIndex][dayIndex] || {};
    habitDayData.status = status;
    habitDayData.time = time;
    updatedHabitData[habitIndex][dayIndex] = habitDayData;
    setHabitData(updatedHabitData);
  };

  // Function to render the status buttons for a habit and day
  const renderStatusButton = (habitIndex, dayIndex, status, time) => {
    return (
      <button
        className={`status-button ${getStatusButtonClass(habitIndex, dayIndex, status)}`}
        onClick={() => handleStatusChange(habitIndex, dayIndex, status, time)}
      >
        {status}
      </button>
    );
  };

  // Function to determine the class for the status button based on the selected status
  const getStatusButtonClass = (habitIndex, dayIndex, status) => {
    const habitDayData = habitData[habitIndex][dayIndex] || {};
    if (habitDayData.status === status) {
      return 'active';
    }
    return '';
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <input
        type="text"
        placeholder="Enter a new habit"
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
      />
      <button onClick={handleAddHabit}>Add Habit</button>
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            <th>Timing</th>
            {/* Render the table headers for each day */}
            {habitData.length > 0 &&
              habitData[0].map((_, index) => (
                <th key={index}>Day {index + 1}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Render each habit and its data */}
          {habits.map((habit, habitIndex) => (
            <tr key={habitIndex}>
              <td>{habit}</td>
              <td>
                {/* Input field for entering the timing */}
                <input
                  type="text"
                  placeholder="Timing"
                  onChange={(e) => {
                    const updatedHabitData = [...habitData];
                    const habitDayData = updatedHabitData[habitIndex][0] || {};
                    habitDayData.time = e.target.value;
                    updatedHabitData[habitIndex][0] = habitDayData;
                    setHabitData(updatedHabitData);
                  }}
                />
              </td>
              {/* Render the status buttons for each day */}
              {habitData[habitIndex].map((habitDayData, dayIndex) => (
                <td key={dayIndex}>
                  <div className="status-buttons">
                    {renderStatusButton(habitIndex, dayIndex, 'Done', habitDayData.time)}
                    {renderStatusButton(habitIndex, dayIndex, 'Not done', habitDayData.time)}
                    {renderStatusButton(habitIndex, dayIndex, 'None', habitDayData.time)}
                  </div>
                </td>
              ))}
              <td>
                {/* Button to delete the habit */}
                <button onClick={() => handleDeleteHabit(habitIndex)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

