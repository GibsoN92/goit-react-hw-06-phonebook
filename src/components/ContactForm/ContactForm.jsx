import React from 'react';
import css from './ContactForm.module.scss';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const isInBase = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (!isInBase) {
      dispatch(addContact(name, number));
      form.reset();
    } else {
      alert(`${name} is in use. Try another name.`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css['form-container']}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Z '\-]+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number</label>
      <input
        type="tel"
        name="number"
        pattern="^\+?[0-9\(\) \-]+$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;