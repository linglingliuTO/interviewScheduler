
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointments/index.js";
import React, { useState, useEffect } from "react";
import "index.scss";
import "components/Appointments/styles.scss";
import axios from "axios"
import { getInterview, getAppointmentsForDay } from "helpers/Selectors";


export default function Application(props) {


  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });



  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview= {bookInterview}
        
      />
    );
  });


  function bookInterview(id, interview) {
    console.log(id, interview);
  }





  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then((all) => {
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));

  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    const testURL = `/api/days`;
    axios.get(testURL).then(response => {
      // setDays([...response.data])
    });
  }, []);

  return (

    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>

  );
}
