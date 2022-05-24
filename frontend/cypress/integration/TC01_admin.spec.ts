const POST_TITLE = 'Cypress: My awesome post title';
const POST_CONTENT = 'Cypress: This is the content of the blogpost';

const createPost = () => {
  cy.visit('/post-editor?new=true');
  cy.get('input').type(POST_TITLE);
  cy.get('textarea').type(POST_CONTENT);
  cy.get('button[mat-raised-button]').contains('Submit post').click();
};

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
    cy.get('input').should('contain.value', POST_TITLE);
    cy.get('textarea').should('have.value', POST_CONTENT);
    cy.get('input').type(' [UPDATED]');
    cy.get('button[mat-raised-button]').contains('Submit post').click();
    cy.get('.mat-simple-snack-bar-content')
      .should('have.text', getSuccessMessageForPostAction('updated'));
    cy.get('input').should('contain.value', `${POST_TITLE} [UPDATED]`);
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
