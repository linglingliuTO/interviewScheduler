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
    const history_copy = [...history]
    if (history_copy.length > 1) {
      history_copy.splice(history_copy.length - 1)
      setMode(mode => (history[history_copy.length - 1]))
     
    }
  }
  return { mode, transition, back };
}