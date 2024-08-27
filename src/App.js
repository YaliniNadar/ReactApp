import './App.css';
import {get, getAll, deleteById, post, put} from './memdb';
import { useState, useEffect } from 'react';

function App() {

  let blankCustomer = {"id": -1, "name":"", "email": "", "password": ""};
  const [selectedRow, setSelectedRow] = useState(null);
  const [formCustomer, setFormCustomer] = useState(blankCustomer);

  const [customers, setCustomers] = useState([]);

  const handleInputChange = function (event) {
    console.log("in handleInputChange()");
    const {name, value} = event.target;
    setFormCustomer((prevFormdata) => ({
      ...prevFormdata,
      [name]: value
    }));
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

  let handleAddClick = function() {
   
    console.log('Add btn clicked');
    if(selectedRow === null) {
      //call post

      console.log(formCustomer);
      post(formCustomer);
    } else {
      //call put
      console.log(formCustomer);
      put(formCustomer.id, formCustomer);
    }
    setFormCustomer(blankCustomer);
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

  <input type="button" value="Delete" onClick={handleDeleteClick}>
        </input>
        <input type="button" value="Save" onClick={handleAddClick}>
        </input>
        <input type="button" value="Cancel" onClick={handleCancelClick}>
        </input>

      </form>
        </div>
        </div>
            
    </div>
    </div>
  );
}

export default App;
