import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import cookie from 'cookie';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import {CURRENT_USER_QUERY} from './User';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    ) {
        signup(
            email: $email
            name: $name
            password: $password
        ) {
            id
            email
            name
        }
    }
`;

class Signup extends Component {
  state = {
    name: '',
    password: '',
    email: ''
  };

  saveToState = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[
          {query: CURRENT_USER_QUERY} //, variables if there were any
        ]}
      >
        {(signup, {error, loading}) => {

          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await signup();
                // Force a reload of all the current queries now that the user is logged in
                // client.cache.reset().then(() => {
                //   redirect({}, '/')
                // });

                this.setState({name: '', email: '', password: ''});
              }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up for an account</h2>
                <ErrorMessage error={error}/>
                <label htmlFor="email">
                  email
                  <input type="email" name="email" placeholder="email" value={this.state.email}
                         onChange={this.saveToState}/>
                </label>
                <label htmlFor="name">
                  name
                  <input type="text" name="name" placeholder="name" value={this.state.name}
                         onChange={this.saveToState}/>
                </label>
                <label htmlFor="password">
                  password
                  <input type="password" name="password" placeholder="password" value={this.state.password}
                         onChange={this.saveToState}/>
                </label>

                <button type="submit">Sign Up!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
export {SIGNUP_MUTATION};
