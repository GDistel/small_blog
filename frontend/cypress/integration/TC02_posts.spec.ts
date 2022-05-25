import { createPost, POST_CONTENT, POST_TITLE } from "./common";

const COMMENT_EMAIL = 'john.doe@company.com';
const COMMENT_TEXT = 'Awesome post!';

describe('The posts interface', () => {

    it('should show the posts and allow me to navigate to one of them', () => {
        createPost();
        cy.visit('/posts-list');
        cy.contains(POST_TITLE).click();
        cy.url().should('include', 'post-detail');
        cy.get('.header__title').should('contain.text', POST_TITLE);
        cy.get('.post-detail__content').should('contain.text', POST_CONTENT);
    });

    it('should allow me to leave a comment on a post', () => {
        createPost();
        cy.visit('/posts-list');
        cy.contains(POST_TITLE).click();
        cy.get('.email-input').type(COMMENT_EMAIL);
        cy.get('.comment-input').type(COMMENT_TEXT);
        cy.get('button[mat-raised-button]').contains('Submit comment').click();
        cy.get('.mat-simple-snack-bar-content')
            .should('contain.text', 'Comment successfully submitted');
        cy.get('.email-input').should('not.have.text', COMMENT_EMAIL);
        cy.get('.comment-input').should('not.have.text', COMMENT_TEXT);
        cy.contains(COMMENT_EMAIL);
        cy.contains(COMMENT_TEXT);
    });

});