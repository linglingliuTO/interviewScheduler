 function getInterview (state, interview) {
  if (interview === null) {
    return null
  }


   const resultObj = {} 
   resultObj["student"] = interview.student
    resultObj["interviewer"] =  state.interviewers[interview.interviewer]


return resultObj
 }
 function getAppointmentsForDay (state, day) {
  if (state.days.length === 0) {
    return []
  }

  if (state.days.length === 0) {
    return []
  }


  const filteredNames = state.days.filter(days => days.name === day);
  if (filteredNames[0] === undefined) {
    return []
  }
  const appointArr =  filteredNames[0].appointments;
  const result = []
  for (const appoint of appointArr) {
    result.push(state.appointments[appoint])
  }
  return result
}

function getInterviewersForDay (state, day) {
  if (state.days.length === 0) {
    return []
  }

  if (state.days.length === 0) {
    return []
  }


  const filteredNames = state.days.filter(days => days.name === day);
  if (filteredNames[0] === undefined) {
    return []
  }
  const interArr =  filteredNames[0].interviewers;
  const result = []
  for (const inter of interArr) {
    result.push(state.interviewers[inter])
  }
  return result
}

export {getAppointmentsForDay, getInterviewersForDay, getInterview}