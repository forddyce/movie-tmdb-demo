describe("Register Page", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it("should display register form", () => {
        cy.contains("Register").should("be.visible");
        cy.get('input[type="text"]').should("be.visible");
        cy.get('input[type="email"]').should("be.visible");
        cy.get('input[type="password"]').should("be.visible");
        cy.get('button[type="submit"]').should("be.visible");
    });

    it("should show validation errors for empty fields", () => {
        cy.get('button[type="submit"]').click();
        cy.contains("Display Name is required").should("be.visible");
        cy.contains("Email is required").should("be.visible");
        cy.contains("Password is required").should("be.visible");
    });

    it("should show error for short password", () => {
        cy.get('input[type="text"]').type("John Doe");
        cy.get('input[type="email"]').type("john@example.com");
        cy.get('input[type="password"]').type("12345");
        cy.get('button[type="submit"]').click();
        cy.contains("Password must be at least 6 characters").should(
            "be.visible"
        );
    });

    it("should navigate to login page", () => {
        cy.contains("Login").click();
        cy.url().should("include", "/login");
    });

    it("should display social login buttons", () => {
        cy.contains("Login with Google").should("be.visible");
        cy.contains("Login with Facebook").should("be.visible");
        cy.contains("Login with Apple").should("be.visible");
    });
});
