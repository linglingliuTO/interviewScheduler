
import React, { Fragment } from 'react'
import Show from "./Show.js";
import Empty from "./Empty.js";
import Header from "./Header.js";
export default function Appointment(props) {


  return (
 <article className="appointment">
    <Fragment>
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}
    </Fragment>
   </article>
  );
}