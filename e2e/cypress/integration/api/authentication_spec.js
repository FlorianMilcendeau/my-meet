describe('User authentication', () => {
    it('Api - Account already exist', () => {
        cy.request({
            method: 'POST',
            url: '/api/authenticate/sign-up',
            failOnStatusCode: false,
            body: {
                name: 'John',
                email: 'jdoe@gmail.com',
                password: '$cx4&4?eLXd@N%62',
            },
        }).then((res) => {
            expect(res.status).to.eq(409);
            expect(res.body).to.include({
                success: false,
                message: 'Account already exist.',
            });
        });
    });

    it('Api - User registration', () => {
        cy.request('POST', '/api/authenticate/sign-up', {
            name: 'Foo',
            email: 'fbar@gmail.com',
            password: 'zAk479wsF@2rTHt',
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.include({
                user: {
                    _id: String,
                    name: 'Foo',
                    email: 'fbar@gmail.com',
                },
                token: {
                    expiresIn: Number,
                    token: new RegExp(/(Bearer)\s+(\S+)/, 'i'),
                },
            });
        });
    });

    /*it('Api - User login', () => {
        cy.request('POST', '/api/authenticate/sign-in', {
            email: 'jdoe@gmail.com',
            password: '$cx4&4?eLXd@N%62',
        }).its('body');
    });*/
});
