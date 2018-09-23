import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuidv4 from 'uuid/v4';

class EditContact extends Component{
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();
    this.setState({
      name: data.name,
      email: data.email,
      phone: data.phone,
    })
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
    };

    const updContact = {
      name,
      email,
      phone
    }
    const { id } = this.props.match.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
      method: 'PUT',
      body: JSON.stringify(updContact),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const updatedData = await res.json();
    dispatch({ type:'UPDATE_CONTACT', payload: updatedData })
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
                Edit Contact
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
                    value="Update Contact"
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

export default EditContact;