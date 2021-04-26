/// <reference types="Cypress"/>

describe('test all the Valid and Invalid user signup scenarios', () => {
	context('valid user signup', () => {
		beforeEach(() => {
			cy.visit('/' + 'register');
		});
		it(`should be successfully authenticated and directed to the user account tab, where I can see my user data and the Hello message`, () => {
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
});
