import { POST_CONTENT, POST_TITLE } from "cypress/fixtures/data";

describe('The post editor page', () => {

    it('should allow the admin to create a new post', () => {
      cy.visit('/post-editor?new=true');
      cy.get('input').type(POST_TITLE);
      cy.get('textarea').type(POST_CONTENT);
      cy.get('button[mat-raised-button]').contains('Submit post').click();
      cy.get('span.mat-simple-snack-bar-content').should('have.text', 'Post successfully created');
      cy.get('input').should('not.have.text', POST_TITLE);
      cy.get('textarea').should('not.have.text', POST_CONTENT);
    });
  
  });