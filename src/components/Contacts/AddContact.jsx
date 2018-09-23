import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuidv4 from 'uuid/v4';

class AddContact extends Component{
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  onChange = (key, e) => {
    this.setState({[key]: e.target.value})
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if(name === ''){
      this.setState({
        errors:{
          name: 'Name is required'
        }
      })
      return;
    }
    if(email === ''){
      this.setState({
        errors:{
          email: 'Email is required'
        }
      })
      return;
    }
    if(phone === ''){
      this.setState({
        errors:{
          phone: 'Phone is required'
        }
      })
      return;
    }
    const newContact = {
      name,
      email,
      phone,
    };
    const res = await fetch('https://jsonplaceholder.typicode.com/users',{
      method: 'POST',
      body: JSON.stringify(newContact),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    dispatch({ type: 'ADD_CONTACT', payload: res })
    //Empty the form
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
    this.props.history.push('/');
  };

  render(){
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card mb-3'>
              <div className="card-header">
                Add Contact
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label='Name'
                    name='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={this.onChange.bind(this, 'name')}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label='Email'
                    name='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={this.onChange.bind(this, 'email')}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label='Phone'
                    name='phone'
                    placeholder='Enter phone'
                    value={phone}
                    onChange={this.onChange.bind(this, 'phone')}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    );
  };
};

export default AddContact;