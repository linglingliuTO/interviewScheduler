import React from "react";
import classNames from "classnames";

import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewerListItem(props) {

   // const dayListItemClass = classNames("day-list__item", {

   //    "day-list__item--full": props.spots === 0,
   //    "day-list__item--selected": props.selected
   // });


   return (
      <li className="interviewers__item">
         <img
            className="interviewers__item-image"
            src="https://i.imgur.com/LpaY82x.png"
            alt="Sylvia Palmer"
         />
         Sylvia Palmer
      </li>
   );
}

