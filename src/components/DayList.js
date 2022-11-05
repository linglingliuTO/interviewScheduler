import React from "react";
import classNames from "classnames";
import DayListItem from "components/DayListItem";



export default function DayList(props){

   const dayItems = props.days.map((days) => {
      return (
        <DayListItem
        key={days.id}
        name={days.name} 
        spots={days.spots} 
        selected={days.name === props.value}
        setDay={props.onChange}  
        />
      );
    });

    return(
      <ul>
       {dayItems}
      </ul>
    )
  }