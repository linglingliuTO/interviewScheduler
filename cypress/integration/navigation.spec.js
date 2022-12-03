describe("Booking", () => {
  it("should visit the root folder", () => {
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should click on the add button of the second appointment", () => {
    cy.get("[alt=Add]")
    .first()
    .click();
  });
  it("should allow entering of name", () => {
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
      .should('have.value', "Lydia Miller-Jones")

  });
  it("should allow users to select an interviewer", () => {
    cy.get("[alt='Sylvia Palmer']").click();

  });
  it("should allow user to click on save", () => {
    cy.get(".button--confirm")
      .click()
      cy.request("GET", "/api/debug/reset")
  });
  it("should allow users to see the booked appointment", () => {
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});

describe("Editing", () => {
  it("should visit the root folder", () => {
    cy.visit("/");
  });

  it("should click on the edit button of the 1st appointment", () => {
    cy.get("[alt=Edit]")
      .invoke("show")
      .first()
      .click();
  });

  it("should allow changing of name", () => {
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type('sam')
      .should('have.value', 'sam')

  });

  it("should allow users to re-select an interviewer", () => {
    cy.get("[alt='Tori Malcolm']").click();

  });
  it("should allow user to click on save", () => {
    cy.get(".button--confirm")
      .click()
  });
  it("should allow users to see the booked appointment", () => {
    cy.contains(".appointment__card--show", "sam");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
});


describe("Cancelling", () => {
  it("should visit the root folder", () => {
    cy.visit("/");
  });
  it("should click on the delete of the 2nd appointment", () => {
    cy.get("[alt=Delete]")
      .invoke("show")
      .first()
      .click();
  });

  it("should allow user to click on confirm", () => {
    cy.contains("Confirm").click();
  });


  it("should allow users to see the empty appointment", () => {
     cy.contains("Deleting");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Tori Malcolm").should("not.exist");
  });
});