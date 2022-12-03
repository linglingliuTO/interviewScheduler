import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    if (replace) {
      setMode(initial => (mode))
      setHistory(prev => {
        const newHistory = [...prev]
        newHistory.pop()
        newHistory.push(mode)
    
        return newHistory
  
      })
    } else {
      setMode(initial => (mode))
      setHistory(prev => ([...prev, mode]))
      
    }
  }

  function back(mode) {
    if (history.length > 1) {
      history.splice(history.length - 1)
      setMode(mode => (history[history.length - 1]))
     
    }
  }
  return { mode, transition, back };
}