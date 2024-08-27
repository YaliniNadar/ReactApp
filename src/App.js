import './App.css';
import './memdb.js';
import { useState, useEffect } from 'react';
import { getAll } from './memdb.js';

function App() {

  const [selectedRow, setSelectedRow] = useState(null);
  const [formCustomer, setFormCustomer] = useState({ name: '', email: "", password: "" })

  const [customers, setCustomers] = useState([]);

  function handleRowClick(index) {
    setSelectedRow(selectedRow === index ? null : index);
    if(selectedRow === index) {

      setFormCustomer({ name: '', email: "", password: "" });
    } else {
      const selectedCustomer = customers[index];

      setFormCustomer({ name: selectedCustomer.name, email: selectedCustomer.email, password: selectedCustomer.password })
    }
  }

  const handleAddClick = () => {
    console.log('Add btn clicked');
  };

  const handleDeleteClick = (index) => {
    console.log('Delete btn clicked');
  };

  const handleCancelClick = () => {
    setFormCustomer({ name: '', email: "", password: "" });
  };

  useEffect(() => {
    getCustomers();
  })

  const getCustomers = function(){
    //log("in getCustomers()");
    setCustomers(getAll());
  }

  const formLabel = selectedRow === null ? "Add New Customer" : "Update Customer";

  return (
    <div className="App">
      <div className='fullbox'>
      <div className='list-box'>
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
                {customers.map((customer, index) => (
                    <tr key={index} onClick={() => handleRowClick(index)} 
                    style={{ fontWeight: selectedRow === index ? 'bold' : 'normal'}}
                    >
                    <td>{index+1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.password}</td>
                    </tr>
                ))}
                </tbody>
            </table> 
          </div>

          <div className='wrapper'>        
          <div className='list-box'>
          <h3>{formLabel}</h3>
<form>
  <table>
      <tr>
        <td>Name: </td>
        <td>
        <input type="text" value={formCustomer.name} readOnly></input>
        </td>
      </tr>
      <tr>
        <td>Email: </td>
        <td>
        <input type="email"value={formCustomer.email} readOnly></input>
        </td>
      </tr>
      <tr>                    
        <td>Password: </td>
        <td>
        <input type="text" value={formCustomer.password} readOnly></input>
        </td>
      </tr>
      
  </table>
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
        </div>
            
    </div>
    </div>
  );
}

export default App;
