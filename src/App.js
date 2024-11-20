import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import logo from "./logo3.png";

function App() {
  const [display, setDisplay] = useState("");  // Store input or result
  const [isEvaluated, setIsEvaluated] = useState(false);  // Check if the operation is completed
  const [history, setHistory] = useState([]);  // Store the history of operations
  const [showModal, setShowModal] = useState(true); // State for controlling modal visibility

  // Function to handle all button clicks
  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("");  // Clear display when 'C' is clicked
      setIsEvaluated(false);  // Reset evaluation state
    } else if (value === "del") {
      if (display.length > 0 && !isEvaluated) {
        setDisplay(display.slice(0, -1));  // Remove last character if the result isn't shown
      } else {
        setDisplay("");  // Clear display if result is shown
        setIsEvaluated(false);
      }
    } else if (value === "=") {
      try {
        const result = eval(display).toString();  // Evaluate the expression
        setDisplay(result);  // Show the result
        setIsEvaluated(true);  // Mark operation as complete
        setHistory([{ operation: display, result: result }, ...history]); // Add operation to history
      } catch {
        setDisplay("Error");  // Show error message for invalid expression
        setIsEvaluated(false);
      }
    } else {
      if (isEvaluated) {
        setDisplay(value);  // Start a new expression if a result was displayed
        setIsEvaluated(false);
      } else {
        setDisplay(display + value);  // Append value to display
      }
    }
  };

  // Listen for keyboard inputs
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key === "Enter") {
        handleClick("=");  // Trigger evaluation on Enter key
      } else if (key === "Backspace") {
        handleClick("del");  // Trigger delete on Backspace
      } else if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
        handleClick(key);  // Handle numerical and operator keys
      } else if (key.toLowerCase() === "c") {
        handleClick("C");  // Handle 'C' key to clear
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isEvaluated, display]);

  const handleModalClose = () => {
    setShowModal(false);  // Close the modal when the user clicks "OK"
  };

  return (
    <div className="App">
      {/* Modal Popup for Reminder */}
      <img src={logo} alt="Logo" className="logo" />
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Reminder</h2>
            <p>You are inputting your operation in two ways: (1) by clicking buttons or (2) by keyboard input.</p>
            <button onClick={handleModalClose}>OK</button>
          </div>
        </div>
      )}

      <div className="Calculator">
        <div className={`Display ${display.length > 15 ? 'large' : ''}`}>
          {display || "0"}
        </div>
        <div className="Button-grid">
          {/* First Row */}
          {["%", "/", "del", "C"].map((btn) => (
            <Button key={btn} label={btn} onClick={() => handleClick(btn)} className={btn === "C" ? "Red" : ""} />
          ))}
          {/* Second Row */}
          {["7", "8", "9", "*"].map((btn) => (
            <Button key={btn} label={btn} onClick={() => handleClick(btn)} />
          ))}
          {/* Third Row */}
          {["4", "5", "6", "-"].map((btn) => (
            <Button key={btn} label={btn} onClick={() => handleClick(btn)} />
          ))}
          {/* Fourth Row */}
          {["1", "2", "3", "+"].map((btn) => (
            <Button key={btn} label={btn} onClick={() => handleClick(btn)} />
          ))}
          {/* Fifth Row - Adjusted for 0 and . in 1 column and = spanning 2 columns */}
          <Button label="0" onClick={() => handleClick("0")} className="Zero" />
          <Button label="." onClick={() => handleClick(".")} />
          <Button label="=" onClick={() => handleClick("=")} className="Equal" />
        </div>
      </div>

      {/* History Sidebar */}
      <div className="History">
        <h3><FontAwesomeIcon icon={faHistory} /> &nbsp;History</h3>
        <div className="History-list">
          {history.map((entry, index) => (
            <div key={index} className="History-item">
              <div>{entry.operation} = {entry.result}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="name">&#169;&nbsp;Developed By Nikhil Faldu</div>
    </div>
  );
}

export default App;
