describe("Intercept Demo", () => {
  it("should mock the user api call ", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/users/1", {
      statusCode: 200,
      body: {
        id: 1,
        name: "mocked user",
        username: "mocked username",
        email: "mocked@gmail.com",
      },
    }).as("getUser");
    cy.visit("http://127.0.0.1:5500/test.html");
    cy.get("#loadUser").click();
    cy.wait("@getUser", { timeout: 10000 }).then((interception) => {
      console.log("requested URL", interception.request.url);
    });
    cy.get("#result").should("contain", "mocked user");
  });
});
