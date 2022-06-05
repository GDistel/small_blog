import { createPost, POST_CONTENT, POST_TITLE } from "./common";

const getSuccessMessageForPostAction = (action: string): string => {
  return `Post successfully ${action}`;
};

describe('The admin interface', () => {

  it('should allow the admin to create a new post', () => {
    createPost();
    cy.get('.mat-simple-snack-bar-content')
      .should('have.text', getSuccessMessageForPostAction('created'));
    cy.get('input').should('not.have.text', POST_TITLE);
    cy.get('textarea').should('not.have.text', POST_CONTENT);
  });

  it('should allow the admin to update an existing post', () => {
    createPost();
    cy.visit('/admin');
    cy.get('.admin-posts-list__title').first()
      .should('contain.text', POST_TITLE);
    cy.get('.admin-posts-list__edit-post').first().click();
    cy.url().should('include', 'post-editor');
    cy.get('.post-editor__post-form_input').first().should('contain.value', POST_TITLE);
    cy.get('textarea').should('have.value', POST_CONTENT);
    cy.get('.post-editor__post-form_input').first().type(' [UPDATED]');
    cy.get('.post-editor__post-form_submit-button').contains('Submit post').click();
    cy.get('.mat-simple-snack-bar-content')
      .should('have.text', getSuccessMessageForPostAction('updated'));
    cy.get('.post-editor__post-form_input').first().should('contain.value', `${POST_TITLE} [UPDATED]`);
  });

  it('should allow the admin to successfully delete a post', () => {
    createPost();
    cy.visit('/admin');
    cy.get('.admin-posts-list__delete-post').first().click();
    cy.get('.confirm-dialog__confirm-button').first().click();
    cy.get('.mat-simple-snack-bar-content')
      .should('contain.text', getSuccessMessageForPostAction('deleted'));
  });

});
