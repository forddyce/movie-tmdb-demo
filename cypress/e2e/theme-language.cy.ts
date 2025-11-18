describe("Theme Toggle", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("should toggle between light and dark mode", () => {
        cy.get("html").should("not.have.class", "dark");

        cy.get('button[aria-label*="theme"]').click();
        cy.get("html").should("have.class", "dark");

        cy.get('button[aria-label*="theme"]').click();
        cy.get("html").should("not.have.class", "dark");
    });

    it("should persist theme preference", () => {
        cy.get('button[aria-label*="theme"]').click();
        cy.get("html").should("have.class", "dark");

        cy.reload();
        cy.get("html").should("have.class", "dark");
    });
});

describe("Language Toggle", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("should toggle between languages", () => {
        cy.get("button").contains("EN").click();
        cy.get("button").contains("ID").should("be.visible");

        cy.get("button").contains("ID").click();
        cy.get("button").contains("EN").should("be.visible");
    });
});
