import React, { Component } from 'react';

import './Auth.css';

class AuthPage extends Component {
  state = {
    isLogin: true
    
  };

  constructor(props) {
    super(props);
    this.firstName1=React.createRef();
    this.lastName1=React.createRef();
    this.emailEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const firstName = this.firstName1.current.value;
    const lastName = this.lastName1.current.value;
    const email = this.emailEl.current.value;
   
    if (email.trim().length === 0 || firstName.trim().length === 0  || lastName.trim().length === 0 ) {
      return;
  
    }
    if (!email.trim().includes('@')){
      return;
  
    }
  

      let requestBody = {
        query: `
          mutation CreateUser($email: String!,$firstName:String!, $lastName:String!) {
            createUser(userInput: {email: $email, firstName:$firstName, lastName:$lastName}) {
              _id
              email
              firstName
              lastName
            }
          }
        `,
        variables: {
          email: email,
          firstName:firstName,
          lastName:lastName
        }
      };
    

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        this.firstName1.current.value=null;
        this.lastName1.current.value=null;
        this.emailEl.current.value=null;
        return res.json();
      })
      .catch(err => {
        console.log(err);       
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
       
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input type="firstName" id="firstName" ref={this.firstName1} />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input type="lastName" id="lastName" ref={this.lastName1} />
        </div>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
