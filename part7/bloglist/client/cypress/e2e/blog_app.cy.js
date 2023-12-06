describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'name1',
      username: 'user1',
      password: 'password1',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('user1')
      cy.get('#password').type('password1')
      cy.get('#login-button').click()

      cy.contains('name1 logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('user1')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'name1 logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'user1', password: 'password1' })
    })

    it('A blog can be created', function () {
      cy.contains('create blog').click()
      cy.get('#title').type('title1')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.get('#create-button').click()

      cy.contains('title1')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'title2',
          author: 'author2',
          url: 'url2',
        })
      })

      it('it can be liked', function () {
        cy.contains('title2').contains('view').click()

        cy.contains('likes 0').find('button').click()
        cy.contains('likes 1')
      })

      it('it can be deleted by the creator', function () {
        cy.contains('title2').contains('view').click()

        cy.contains('remove').click()

        cy.get('html').should('not.contain', 'title2 author2')
      })

      it('it cannot be deleted by anyone else', function () {
        const user = {
          name: 'name2',
          username: 'user2',
          password: 'password2',
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

        cy.contains('logout').click()
        cy.login({ username: 'user2', password: 'password2' })
        cy.contains('title2').parent().as('blog2')
        cy.get('@blog2').contains('view').click()

        cy.get('@blog2')
          .contains('remove')
          .should('have.css', 'display', 'none')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'title3',
          author: 'author3',
          url: 'url3',
        })
        cy.createBlog({
          title: 'title4',
          author: 'author4',
          url: 'url4',
        })
      })

      it('they are sorted by likes', function () {
        cy.contains('title4').parent().as('blog4')
        cy.get('@blog4').contains('view').click()

        cy.get('@blog4').contains('button', 'like').click()

        cy.get('.blog').eq(0).should('contain', 'title4')
        cy.get('.blog').eq(1).should('contain', 'title3')
      })
    })
  })
})
