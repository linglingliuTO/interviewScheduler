
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointments/index.js";
import React from "react";
import "index.scss";
import "components/Appointments/styles.scss";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from "helpers/Selectors";
import useApplicationData from "../hooks/useApplicationData"

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();


  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  

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
