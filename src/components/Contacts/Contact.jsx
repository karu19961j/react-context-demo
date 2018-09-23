import React, { Component } from 'react';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Contact extends Component {
  state = {
    showContactInfo: true
  };

  onShowClick = e => {
    this.setState({ showContactInfo: !this.state.showContactInfo })
  };

  onDeleteClick = async (id, dispatch) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
      method:'DELETE'});
      dispatch({ type:'DELETE_CONTACT', payload:id })
  };

  render() {
    const { contact } = this.props;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return(
            <div className='card card-body mb-3'>
              <h4>
                {contact.name}
                <i
                  onClick={this.onShowClick}
                  className='fas fa-sort-down'
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className='fas fa-times'
                  style={{ cursor:'pointer', float:'right', color:'red' }}
                  onClick={this.onDeleteClick.bind(this, contact.id, dispatch)}
                />
                <Link to={`contact/edit/${contact.id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ?
                <ul className='list=grpup'>
                  <li className='list-group-item'>Email: {contact.email}</li>
                  <li className='list-group-item'>Phone: {contact.phone}</li>
                </ul> : null
              }
            </div>
          )
        }}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
}


export default Contact;