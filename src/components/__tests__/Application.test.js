import React from "react";

import { render, cleanup, waitForElement} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);
  // console.log("this is line 11", render(<Application />))

  return waitForElement(() => getByText("Tuesday"));
});
