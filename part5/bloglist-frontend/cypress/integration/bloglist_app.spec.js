describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Marcus',
      username: 'marcus',
      password: 'admin123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('marcus')
      cy.get('#password').type('admin123')
      cy.get('#login-button').click()

      cy.contains('marcus logged in')
      cy.should('not.contain', 'wrong username or password')
    })

    it('fails  with incorrect credentials', function () {
      cy.get('#username').type('marcus')
      cy.get('#password').type('secreth4x')
      cy.get('#login-button').click()

      cy.should('not.contain', 'marcus logged in')
      cy.get('html').should('contain', 'wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'marcus', password: 'admin123' })
      cy.visit('http://localhost:3000')
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('The Joy of Painting')
      cy.get('#author').type('Bob Ross')
      cy.get('#url').type('http://example.org')
      cy.get('#submit-button').click()

      cy.get('html').should('contain', 'New Blog added')
    })
  })
})
