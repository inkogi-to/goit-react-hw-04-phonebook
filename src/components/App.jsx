import {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import PropTypes from "prop-types"


import {Container, GlobalStyle, TitleContacts, TitlePhonebook} from "./GlobalStyle.styled";

import PhonebookEditor from "./PhonebookEditor"
import Contacts from "./Contacts"
import Filter from "./Filter";

import data from "./data/contacts.json";
import contacts from "./Contacts";


function App() {

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? data
  })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])


  const addContact = (name, number) => {
    const contact = {
      id: nanoid(), name, number
    };
    console.log('sdf')
    !existName(name, number) ? setContacts(
      [contact, ...contacts]
    ) : alert('This contact already exists');
  }
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id))

  }
  const changeFilter = e => {
    console.log('sfsd')
    setFilter(e.target.value)
  }
  const existName = (name, number) => {
    return contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number)
  }
  // componentDidMount()
  // {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({contacts: parsedContacts});
  //   }
  // }
  //
  // componentDidUpdate(prevState, prevProp)
  // {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }


  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))

  return (<Container>
    <TitlePhonebook>Phonebook</TitlePhonebook>
    <PhonebookEditor onSubmit={addContact}/>
    <TitleContacts>Contacts</TitleContacts>
    <Filter value={filter} onChange={changeFilter}/>
    <Contacts contact={filteredContacts} onDeleteContact={deleteContact}/>
    <GlobalStyle/>
  </Container>)

}

App.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired, name: PropTypes.string.isRequired, number: PropTypes.string.isRequired,
  })),
  filter: PropTypes.string,
  addContact: PropTypes.func,
  deleteContact: PropTypes.func,
  existName: PropTypes.func,
  changeFilter: PropTypes.func

}

export default App;
