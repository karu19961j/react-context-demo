import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      {
        id:1,
        name:'Karan',
        email:'karan@gmail.com',
        phone:'9878335575'
      },
      {
        id:2,
        name:'Neha',
        email:'neha@gmail.com',
        phone:'9876234575'
      },
      {
        id:3,
        name:'Saira',
        email:'saira@gmail.com',
        phone:'98745808890'
      }
    ],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  async componentDidMount() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
                .then(res => res.json());
      this.setState({contacts: res})
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;