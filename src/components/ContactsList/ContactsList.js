import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ContactsList.module.scss';
import contactsActions from '../redux/FormInput/contacts-actions';

function ContactsList({ contacts, onDeleteContact }) {
  return (
    <ul className={styles.contact_list}>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={styles.contact_item}>
          <span>
            {name}: {number}
          </span>
          <button
            type="button"
            onClick={() => onDeleteContact(id)}
            className={styles.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

const getVisibleContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = state => {
  const { items, filter } = state.contacts;
  const visibleContacts = getVisibleContacts(items, filter);

  return {
    contacts: visibleContacts,
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsActions.deleteItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
