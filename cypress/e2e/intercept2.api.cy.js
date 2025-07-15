describe("Demo2 intercept 2 ", () => {
  it("should mock user and posts api calls and verify the UI updates", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/users/1", {
      statusCode: 200,
      body: {
        id: 1,
        name: "Mocked User",
        username: "mocked_user",
        email: "mocked@gmail.com",
      },
    }).as("getUser");
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts?userId=1", {
      statusCode: 200,
      body: [
        { userId: 1, id: 1, title: "Mocked Post 1", body: "Lorem ipsum" },
        { userId: 2, id: 2, title: "Mocked Post 2", body: "Dolor sit amet" },
      ],
    }).as("getPosts");
    cy.visit("http://127.0.0.1:5500/test2.html");
    cy.get("#loadData").click();
    cy.wait("@getUser").its("response.statusCode").should("eq", 200);
    cy.wait("@getPosts").its("response.statusCode").should("eq", 200);
    cy.get("#user").should("contain", "Mocked User");
    cy.get("#posts li").should("have.length", 2);
    cy.get("#posts li").eq(0).should("contain", "Mocked Post 1");
    cy.get("#posts li").eq(1).should("contain", "Mocked Post 2");
  });
});
