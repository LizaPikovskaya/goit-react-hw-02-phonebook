import { Component } from 'react';
import { Container } from './Container/Container';
import { GlobalStyle } from './GlobalStyles/GlobalStyles';
import { Phonebook } from './Phonebook/Phonebook';
import { nanoid } from 'nanoid';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { Title, MainTitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addUser = ({ name, number }) => {
    const userId = nanoid();
    const user = {
      id: userId,
      name,
      number,
    };
    this.setState(prevState => ({ contacts: [user, ...prevState.contacts] }));
  };
  deleteUser = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(user => user.id !== id),
    }));
  };
  changeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };
  filterUser = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visibleUsers = this.filterUser();
    return (
      <Container>
        <GlobalStyle />

        <MainTitle>Phonebook</MainTitle>
        <Phonebook onSubmit={this.addUser} data={this.state.contacts} />

        <Title>Contacts</Title>
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        <Contacts data={visibleUsers} onDeleteUser={this.deleteUser}></Contacts>
      </Container>
    );
  }
}
