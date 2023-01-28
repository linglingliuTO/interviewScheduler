
import React, { Fragment } from 'react'
import Show from "./Show.js";
import Empty from "./Empty.js";
import Header from "./Header.js";
import Form from "./Form.js";
import Confirm from "./Confirm.js";
import Status from "./Status.js";
import Error from "./Error.js";
import useVisualMode from "../../hooks/useVisualMode.js"



export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    // console.log("saving")
    props.bookInterview(props.id, interview)
      .then((result) => {
        if (result) {
          transition(SHOW)
        } else {
          transition(ERROR_SAVE, true)
        }
      }
      )


  }

  function onConfirm() {
    transition(CONFIRM)
  }


  function onDelete() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then((result) => {
        if (result) {
          transition(EMPTY)
        } else {
          transition(ERROR_DELETE, true)
        }
      })
  }


  function onEdit() {
    transition(EDIT)
  }

  // console.log(mode)
  return (
    <article className="appointment" data-testid="appointment">
    <Header time={props.time} />

      <Fragment>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview?.student}
            interviewer={props.interview?.interviewer?.name}
            onConfirm={onConfirm}
            onEdit={onEdit}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            interviewer={null}
            placeholder="Please enter student name"
            onCancel={back}
            onSave={save}

          />
        )}
        {mode === SAVING && (<Status message="Saving" />)}
        {mode === CONFIRM && (<Confirm onCancel={back} onDelete={onDelete} />)}
        {mode === DELETING && (<Status message="Deleting" />)}
        {mode === EDIT && (
          <Form
            interviewers={props?.interviewers}
            placeholder={props?.interview?.student}
            interviewer={props?.interview?.interviewer.id}
            student={props?.interview?.student}
            onCancel={()=>transition(SHOW)}
            onSave={save}
          />)}
        {mode === ERROR_SAVE && (<Error message="Error cannot save" onClose ={onEdit}/>)}
        {mode === ERROR_DELETE && (<Error message="Error cannot delete" onClose ={back}/>)}
      </Fragment>
    </article>
  );
}