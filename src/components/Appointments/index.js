
import React, { Fragment } from 'react'
import Show from "./Show.js";
import Empty from "./Empty.js";
import Header from "./Header.js";
import Form from "./Form.js";
import Status from "./Status.js";
import useVisualMode from "../../hooks/useVisualMode.js"



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING= "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    // console.log("saving")
    props.bookInterview(props.id,interview)
    .then(() => transition(SHOW))
    
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
           interviewers = {props.interviewers}
           onCancel = {back}
           onSave = {save}
      
          />
        )}
         {mode === SAVING && (<Status message = "saving"  />)}
      </Fragment>
    </article>
  );
}