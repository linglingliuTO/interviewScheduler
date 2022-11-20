
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
  }

const save =() => {props.onSave(student,interviewer)}
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder= {props.placeholder}
            onSubmit={event => event.preventDefault()}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
         interviewers={props.interviewers}
         onChange={setInterviewer}
         value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>{handleClick() }}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}