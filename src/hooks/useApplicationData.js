import axios from "axios"
import React, { useState, useEffect } from "react";
export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });



  const setDay = day => setState({ ...state, day });

  const updateSpots = (item) => (console.log(item))

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);


  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        setState({
          ...state,
          appointments
        })
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })

  }


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          appointments
        });
        return true
      })
      .catch(err => {
        console.log(err)
        return false
      })



  }



  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  }

  // 

} 