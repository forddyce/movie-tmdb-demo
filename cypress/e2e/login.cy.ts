describe("Login Page", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("should display login form", () => {
        cy.contains("Login").should("be.visible");
        cy.get('input[type="email"]').should("be.visible");
        cy.get('input[type="password"]').should("be.visible");
        cy.get('button[type="submit"]').should("be.visible");
    });

    it("should show validation errors for empty fields", () => {
        cy.get('button[type="submit"]').click();
        cy.contains("Email is required").should("be.visible");
        cy.contains("Password is required").should("be.visible");
    });

    it("should show error for invalid email", () => {
        cy.get('input[type="email"]').type("invalid-email");
        cy.get('input[type="password"]').type("password123");
        cy.get('button[type="submit"]').click();
        cy.contains("Invalid email address").should("be.visible");
    });

    it("should navigate to register page", () => {
        cy.contains("Register").click();
        cy.url().should("include", "/register");
    });

    it("should display social login buttons", () => {
        cy.contains("Login with Google").should("be.visible");
        cy.contains("Login with Facebook").should("be.visible");
        cy.contains("Login with Apple").should("be.visible");
    });
});
