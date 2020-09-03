import { Navbar, Button } from 'react-bootstrap'
import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import { getToken, deleteToken } from '../token'

const Nav = (props) => {
  const isLoggedIn = !!getToken();
  console.log(getToken().length)

  return (
    <>
      <Navbar>
        <Navbar.Brand>
          {isLoggedIn ? (
            <Link to="/">
              Todo
            </Link>
          ) :
            (
              <Link to="/login">
                Todo
              </Link>
            )
          }
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn ? (
            <>
              <Navbar.Text>
                Hi: {' '}
              </Navbar.Text>
              <Button
                variant="outline-dark"
                onClick={() => {
                  deleteToken();
                  console.log(props)
                  props.history.push('/login');
                }}>
                Logout</Button>
            </>
          ) : (
              <Link to="/login" className="ml1 no-underline black">
                login
              </Link>
            )}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default withRouter(Nav);