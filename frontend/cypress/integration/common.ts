export const POST_TITLE = 'Cypress: My awesome post title';
export const POST_CONTENT = 'Cypress: This is the content of the blogpost';

export const createPost = () => {
    cy.visit('/post-editor?new=true');
    cy.get('input').type(POST_TITLE);
    cy.get('textarea').type(POST_CONTENT);
    cy.get('button[mat-raised-button]').contains('Submit post').click();
};