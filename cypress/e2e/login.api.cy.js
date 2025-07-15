// login
// this login will not happen on UI. it will be handled by backend

describe("Login API Test", () => {
  // auth session

  beforeEach(() => {
    // we have to perfrom the rest call.

    cy.session("auth login", () => {
      cy.request({
        method: "POST",
        // headers
        headers: {
          "x-api-key": "reqres-free-v1",
        },

        url: "https://reqres.in/api/login",
        body: { email: "eve.holt@reqres.in", password: "cityslicka" },
      }).then((res) => {
        try {
          if (res.status !== 200) {
            throw new Error(
              `Login failed with status: ${res.status}, body: ${JSON.stringify(
                res.body
              )}`
            );
          }
          if (!res.body || !res.body.token) {
            throw new Error("Login response does not contain a token");
          }
          // Save the token to session storage
          cy.log("token: ", res.body.token);
        } catch (e) {
          console.error("Error in login API: ", e);
        }
      });
    });
  });
  it("should login successfully", () => {});
});
