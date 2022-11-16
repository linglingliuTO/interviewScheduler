
import React, { Fragment } from 'react'
import Show from "./Show.js";
import Empty from "./Empty.js";
import Header from "./Header.js";
import Form from "./Form.js";
import useVisualMode from "../../hooks/useVisualMode.js"



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id,interview)
  }



  return (
    <article className="appointment">
      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        )}
         {mode === CREATE && (
          <Form
           interviewers = {[]}
           onCancel = {back}
           onSave = {save}
          />
        )}
      </Fragment>
    </article>
  );
}