import React from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';
import gql from 'graphql-tag'
import { useMutation } from 'urql'
import { setToken, getToken, deleteToken } from '../token'
import Combine from './Post'

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const Login = props => {
  // Used to switch between login and signup button
  const [switchLogin, setSwitch] = React.useState(true)
  const [isLogin, setLogin] = React.useState(!!getToken())
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  const [state, executeMutation] = useMutation(
    switchLogin ? LOGIN_MUTATION : SIGNUP_MUTATION
  );

  const mutate = React.useCallback(() => {
    executeMutation({ email, password, name })
      .then(({ data }) => {
        const token = data && data[switchLogin ? 'login' : 'signup'].token
        if (token) {
          setToken(token)
          setLogin(!!getToken())
        }
      });
  }, [executeMutation, switchLogin, email, password, name]);

  return (
    <>
      <Row className="justify-content-md-center" style={{ marginTop: 100 }}>
        <Col sm={6} >
          <h4 className="text-center">{switchLogin ? 'Sign In' : 'Sign Up'}</h4>
          <br></br>
          <Form>
            {!switchLogin && (
              <Form.Group controlId="formBasicName">
                <Form.Control
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter name" />
              </Form.Group>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Control value={email}
                onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control value={password}
                onChange={e => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Button variant="outline-secondary"
              disabled={state.fetching}

              onClick={() => { mutate(); }}>
              {switchLogin ? "login" : "create account"}
            </Button>{' '}
            <Button variant="outline-secondary"
              disabled={state.fetching}
              onClick={() => setSwitch(!switchLogin)}
            >
              {switchLogin ? 'need to create an account?' : 'already have an account?'}
            </Button>
            {isLogin && (
              <>
                {/* <Button variant="outline-secondary"
                  disabled={state.fetching}

                  onClick={() => { deleteToken(); setLogin(!!getToken()); }} >
                  {"deleteToken"}
                </Button> */}

                < Combine handleLogout={() => { deleteToken(); setLogin(!!getToken()); }} />
              </>
            )
            }


            {/* <Button variant="outline-secondary"
              disabled={state.fetching}

              onClick={() => { getToken(); }} >
              {"getToken"}
            </Button> */}

          </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login