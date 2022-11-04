import React from "react";

import "components/Button.scss";
import { process_params } from "express/lib/router";
import classNames from "classnames";

export default function Button(props) {
   // let buttonClass = "button";

   // if (props.confirm) {
   //    buttonClass += " button--confirm";
   // }

   // if (props.danger) {
   //    buttonClass += " button--danger";
   // }
   var buttonClass = classNames({
      button: true,
      " button--confirm": props.confirm,
      " button--danger": props.danger
    });

   return (
      <button
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
      );
}
