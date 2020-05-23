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
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('The Joy of Painting')
      cy.get('#author').type('Bob Ross')
      cy.get('#url').type('http://example.org')
      cy.get('#submit-button').click()

      cy.get('html').should('contain', 'New Blog added')
    })

    it('blogs are sorted by likes', function () {
      cy.createBlog({ title: 'aaa', author: 'ddd', url: "http://example.com" })
      cy.createBlog({ title: 'bbb', author: 'eee', url: "http://example.com" })
      cy.createBlog({ title: 'ccc', author: 'fff', url: "http://example.com" })
      cy.likeBlog({ title: 'bbb', author: 'eee', clicks: 12})
      cy.likeBlog({ title: 'aaa', author: 'ddd', clicks: 2})

      cy.visit('http://localhost:3000')

      cy.get('.blog').then(function (blogs) {
        cy.wrap(blogs[0]).contains('bbb')
        cy.wrap(blogs[1]).contains('aaa')
        cy.wrap(blogs[2]).contains('ccc')
      })
    })

    describe('and a blog was created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The Joy of Painting',
          author: 'Bob Ross',
          url: 'http://example.org',
        })
      })

      it('it can be liked', function () {
        cy.contains('The Joy of Painting').as('blogEntry')
        cy.get('@blogEntry').contains('view').click()
        cy.get('@blogEntry').contains('likes 0')
        cy.get('@blogEntry').contains('like').click()
        cy.get('@blogEntry').contains('likes 1')
      })

      it('it can be deleted', function () {
        cy.contains('The Joy of Painting').as('blogEntry')
        cy.get('@blogEntry').contains('view').click()
        cy.get('@blogEntry').contains('remove').click()

        cy.get('html').should('not.contain', 'The Joy of Painting')
      })
    })
  })
})
