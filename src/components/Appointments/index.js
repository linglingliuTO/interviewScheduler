
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
  const ERROR_EDIT = "ERROR_EDIT";
  const ERROR_CREATE = "ERROR_CREATE";
  const ERROR_EDIT_MSG = "ERROR_EDIT_MSG";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
  
    props.bookInterview(props.id, interview)
      .then((result) => {
        if (result) {
          transition(SHOW)
        } else {
          if (mode === EDIT)
          transition(ERROR_EDIT_MSG, true)
          else 
          transition(ERROR_SAVE,true)
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

  function onEditError() {
    transition(ERROR_EDIT)
  }

  function onCreateError() {
    transition(ERROR_CREATE)
  }


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
        {mode === CONFIRM && (<Confirm onCancel={()=>transition(SHOW)} onDelete={onDelete} />)}
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
        {mode === ERROR_EDIT && (
          <Form
            interviewers={props?.interviewers}
            placeholder={props?.interview?.student}
            interviewer={props?.interview?.interviewer.id}
            student={props?.interview?.student}
            onCancel={()=>transition(SHOW)}
            onSave={save}
          />)}
            {mode === ERROR_CREATE && (
          <Form
            interviewers={props.interviewers}
            interviewer={null}
            placeholder="Please enter student name"
            onCancel={()=>transition(EMPTY)}
            onSave={save}
          />)}
        {mode === ERROR_SAVE && (<Error message="Error cannot save" onClose ={onCreateError}/>)}
        {mode === ERROR_EDIT_MSG && (<Error message="Error cannot save" onClose ={onEditError}/>)}
        {mode === ERROR_DELETE && (<Error message="Error cannot delete" onClose ={back}/>)}
      </Fragment>
    </article>
  );
}