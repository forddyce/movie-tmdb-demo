describe("Search Functionality", () => {
    beforeEach(() => {
        cy.intercept("POST", "**/auth/**").as("auth");
        cy.visit("/login");
        cy.get('input[type="email"]').type("test@example.com");
        cy.get('input[type="password"]').type("password123");
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    });

    it("should display search page", () => {
        cy.visit("/search");
        cy.get('input[type="text"]').should("be.visible");
        cy.contains("Search").should("be.visible");
    });

    it("should search for movies", () => {
        cy.visit("/search");
        cy.get('input[type="text"]').type("Avengers");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
        cy.get('[class*="MovieCard"]').should("have.length.greaterThan", 0);
    });

    it("should show no results message for invalid search", () => {
        cy.visit("/search");
        cy.get('input[type="text"]').type("xyzabc123notamovie");
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
        cy.contains("No results found").should("be.visible");
    });
});
