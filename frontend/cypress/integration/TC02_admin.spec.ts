import { POST_CONTENT, POST_TITLE } from "cypress/fixtures/data";

describe('The admin page', () => {

  it('should allow the admin to update an existing post', () => {
    cy.visit('/admin');
    cy.get('.admin-posts-list__title').first().should('contain.text', POST_TITLE);
    cy.get('.admin-posts-list__edit-post').first().click();
    cy.url().should('include', 'post-editor');
    cy.get('input').should('contain.value', POST_TITLE);
    cy.get('textarea').should('have.value', POST_CONTENT);
    cy.get('input').type(' [UPDATED]');
    cy.get('button[mat-raised-button]').contains('Submit post').click();
    cy.get('span.mat-simple-snack-bar-content').should('have.text', 'Post successfully updated');
    cy.get('input').should('contain.value', `${POST_TITLE} [UPDATED]`);
  });

  it('should allow the admin to successfully delete a post', () => {
    cy.visit('/admin');
    cy.get('.admin-posts-list__delete-post').first().click();
    cy.get('.confirm-dialog__confirm-button').first().click();
    cy.get('span.mat-simple-snack-bar-content').should('contain.text', 'Post successfully deleted');
  });

});
