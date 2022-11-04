import React from "react";
import classNames from "classnames";


const days = [
   {
     id: 1,
     name: "Monday",
     spots: 2,
   },
   {
     id: 2,
     name: "Tuesday",
     spots: 5,
   },
   {
     id: 3,
     name: "Wednesday",
     spots: 0,
   },
 ];


export default function DayListItem(props) {
 
   const dayListItemClass = classNames("day-list__item",{
      
      "day-list__item--full": props.spots === 0 ,
      "day-list__item--selected": props.selected
    });

    const formatSpots  = (spots) => {
      let result = ""
      if (spots === 0) {
         result = "no spots remaining"
      } else if (spots === 1) {
         result =  spots + " spot remaining"
      } else {
         result = + spots + " spots remaining"
      }
      return result
    }

  return (
   <li onClick={() => props.setDay(props.name)} className = {dayListItemClass}>
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

