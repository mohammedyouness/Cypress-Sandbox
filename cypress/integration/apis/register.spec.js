/// <reference types="Cypress"/>

describe('test all the Valid and Invalid user signup scenarios', () => {
	context('valid user signup', () => {
		beforeEach(() => {
			cy.visit('/' + 'register');
		});
		it(`When I fill out the signup form with valid data and press the signup button, Then I should be successfully authenticated and directed to the user account tab, where I can see my user data and the Hello message`, () => {
			cy.intercept('POST', 'https://phptravels.net/account/signup').as(
				'postRequest'
			);
			cy.register();
			cy.wait('@postRequest').then(xhr => {
				expect(xhr.response.statusCode).to.eql(200);
				let reqBody = xhr.request.body.split('&');
				let firstName = reqBody[0],
					lastName = reqBody[1];

				let extractedFName = firstName.substring(firstName.indexOf('=') + 1);
				extractedFName = firstName.split('=').pop();

				let extractedLName = lastName.substring(lastName.indexOf('=') + 1);
				extractedLName = lastName.split('=').pop();
				cy.get('h3.text-align-left').should(
					'contain',
					`Hi, ${extractedFName} ${extractedLName}`
				);
			});
		});
	});
	context('invalid user signup', () => {
		beforeEach(() => {
			cy.visit('/' + 'register');
		});
		it('Given that I previously signed up with an email, When I use same email for a new sign up, Then I should receive an error message', () => {
			cy.register('used');
			cy.get('.alert').should('contain', 'Email Already Exists.');
		});
		it('When I sign up for an incorrect email format, Then I should receive an error message', () => {
			cy.register('incorrect');
			cy.get('.alert').should(
				'contain',
				'The Email field must contain a valid email address.'
			);
		});
	});
});
