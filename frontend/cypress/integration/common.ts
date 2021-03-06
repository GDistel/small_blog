export const POST_TITLE = 'Cypress: My awesome post';
export const POST_CONTENT = 'Cypress: This is the content of the blogpost';

export const createPost = () => {
    cy.visit('/post-editor?new=true');
    cy.get('.post-editor__post-form_input').first().type(POST_TITLE);
    cy.get('textarea').type(POST_CONTENT);
    cy.get('.post-editor__post-form_submit-button').contains('Submit post').click();
};