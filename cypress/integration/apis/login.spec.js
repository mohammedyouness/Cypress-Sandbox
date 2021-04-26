/// <reference types="Cypress"/>

describe('test all the Valid and Invalid user login scenarios', () => {
	context('valid user login', () => {
		beforeEach(() => {
			cy.visit('/' + 'login');
		});
		it(`When I use an already-registered account, Then I should be able to log in successfully`, () => {
			cy.intercept('POST', 'https://phptravels.net/account/login').as(
				'loginRequest'
			);
			cy.login();
			cy.wait('@loginRequest').then(xhr => {
				expect(xhr.response.statusCode).to.eql(200);
			});
			cy.get('h3.text-align-left').should('contain', `Hi, John Doe`);
		});
	});
	context('invalid user login', () => {
		beforeEach(() => {
			cy.visit('/' + 'login');
		});
		it('When I enter a not registered account,Then I should receive an error message', () => {
			cy.login('not registered');
			cy.get('.alert').should('contain', 'Invalid Email or Password');
		});
	});
});
