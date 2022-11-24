
import React, { useState } from "react";
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const handleClick = () => {
    setStudent("")
    setInterviewer(null)
    props.onCancel()
    setError("")
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

  if (interviewer === null) {
    setError("Please select an interviewer");
    return;
  }
  
    props.onSave(student, interviewer);
    setError("")
  }

  const [error, setError] = useState("");

// const save =() => {props.onSave(student,interviewer)}
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder= "Enter Student Name"
            onSubmit={event => event.preventDefault()}
            onChange={(event) => setStudent(event.target.value)}
            value={student}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
         interviewers={props.interviewers}
         onChange={setInterviewer}
         value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>{handleClick() }}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}