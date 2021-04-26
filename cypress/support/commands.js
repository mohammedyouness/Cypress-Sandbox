const faker = require('faker');
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const mobileNumer = faker.phone.phoneNumber();
const randomEmail = faker.internet.email();
const password = faker.internet.password();
const confirmPassword = password;

Cypress.Commands.add('register', usedEmail => {
	cy.fixture('userData').then(user => {
		cy.get('[name="firstname"]').type(firstName, { force: true });
		cy.get('[name="lastname"]').type(lastName, { force: true });
		cy.get('[name="phone"]').type(mobileNumer, { force: true });
		if (usedEmail)
			cy.get('[name="email"]').type(user.existentEmail, { force: true });
		else cy.get('[name="email"]').type(randomEmail, { force: true });
		cy.get('[name="password"]').type(password, { force: true });
		cy.get('[name="confirmpassword"]').type(confirmPassword, {
			force: true,
		});
		cy.get('.signupbtn').click({ force: true });
	});
});
