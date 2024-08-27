import './App.css';
import './memdb.js';
import { useState, useEffect } from 'react';
import { deleteById, getAll } from './memdb.js';

function App() {

  let blankCustomer = {"id": -1, "name":"", "email": "", "password": ""}
  const [selectedRow, setSelectedRow] = useState(null);
  const [formCustomer, setFormCustomer] = useState(blankCustomer);

  const [customers, setCustomers] = useState([]);

  const handleInputChange = function (event) {
    console.log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...customers};
    newFormObject[name] = value;
    setFormCustomer(newFormObject);
  }

  function handleRowClick(index) {
    setSelectedRow(selectedRow === index ? null : index);
    if(selectedRow === index) {

      setFormCustomer(blankCustomer);
    } else {
      const selectedCustomer = customers[index];

      setFormCustomer({ id: selectedCustomer.id, name: selectedCustomer.name, email: selectedCustomer.email, password: selectedCustomer.password })
    }
  }

  const handleAddClick = (e) => {
    console.log('Add btn clicked');
    // if(formLabel === 'Add New Customer') {
    //   //call post
    //   post()
    // } else {
    //   //call put
    //   const selectedCustomer = customers[index];

    //   put(index, selectedCustomer);
    // }
  };

  
  
  let handleDeleteClick = function () {
    if(formCustomer.id >= 0){
      deleteById(formCustomer.id);
      setSelectedRow(null);

    } else {
      alert("Please Select a Customer to Delete");
    }
    setFormCustomer(blankCustomer);
    
  }

  const handleCancelClick = () => {
    setFormCustomer(blankCustomer);
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
        <input id="nameText" type="text" value={formCustomer.name} onChange={(e) => handleInputChange(e)}></input>
        </td>
      </tr>
      <tr>
        <td>Email: </td>
        <td>
        <input type="email"value={formCustomer.email} onChange={(e) => handleInputChange(e)}></input>
        </td>
      </tr>
      <tr>                    
        <td>Password: </td>
        <td>
        <input type="text" value={formCustomer.password} onChange={(e) => handleInputChange(e)}></input>
        </td>
      </tr>
      
  </table>
  <button type="button" value="Delete" onClick={handleDeleteClick}>
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
