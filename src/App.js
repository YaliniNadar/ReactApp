import './App.css';
import { useState } from 'react';

function App() {
  const [customerList, setCustomerList] = useState([
    { name: 'Yalini Nadar', email: "yalini.nadar@abc.com", pswd: "1234" },
    { name: 'Donnis Marshall', email: "donnis.marshall@abc.com", pswd: "password" },
    { name: 'Ted Mosby', email: "ted.mosby@abc.com", pswd: "himym" },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');

  function handleRowClick(index) {
    setSelectedRow(selectedRow === index ? null : index);
    if(selectedRow === index) {
      setFormName('');
      setFormEmail('');
      setFormPassword('');
    } else {
      const selectedCustomer = customerList[index];
      setFormName(selectedCustomer.name);
      setFormEmail(selectedCustomer.email);
      setFormPassword(selectedCustomer.pswd);
    }
  }

  const handleAddClick = () => {
    console.log('Add btn clicked');
  };

  const handleDeleteClick = () => {
    console.log('Delete btn clicked');
  };

  const handleCancelClick = () => {
    setFormName('');
    setFormEmail('');
    setFormPassword('');
  };

  const formLabel = selectedRow === null ? "Add New Customer" : "Update Customer";

  return (
    <div className="App">
      <h1>Customer List</h1>
      <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
                </thead>
                <tbody>
                {customerList.map((customer, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)} 
                    style={{ fontWeight: selectedRow === index ? 'bold' : 'normal'}}
                    >
                    <td>{index+1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.pswd}</td>
                    </tr>
                ))}
                </tbody>
            </table> 

            <h3>{formLabel}</h3>

            <form>
                <label>Name</label>
                <input type="text" value={formName} readOnly></input>

                <label>Email</label>
                <input type="email"value={formEmail} readOnly></input>

                <label>Password</label>
                <input type="text" value={formPassword} readOnly></input>
            <br></br>
            <button onClick={handleDeleteClick}>
              Delete
            </button>
            <button onClick={handleAddClick}>
              Add
            </button>
            <button onClick={handleCancelClick}>
              Cancel
            </button>
        </form>
    </div>
  );
}

export default App;
