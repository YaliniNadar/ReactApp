import './App.css';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';
import {get, deleteById, put} from './memdb';
import {getAll, post, post2} from './restdb';
import { useState, useEffect } from 'react';
import CustomerTable from './components/CustomerTable';

function App() {

  let blankCustomer = {"id": -1, "name":"", "email": "", "password": ""};
  const [currId, setCurrID] = useState(3);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formCustomer, setFormCustomer] = useState(blankCustomer);

  const [customers, setCustomers] = useState([]);

  const handleInputChange = function (event) {
    console.log("in handleInputChange()");
    const {name, value} = event.target;
    console.log(`Updating ${name} with ${value}`)
    let newFormObject = {...formCustomer}
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

  let handleAddClick = function() {

    if(!formCustomer.name || !formCustomer.email || !formCustomer.password) {
      alert("Please input all fields");
      return;
    }
   
    console.log('Add btn clicked');
    if(selectedRow === null) {
      //call post
      setCurrID((prevId) => prevId + 1);
      const data = {...formCustomer, id: currId}
      console.log(data);
      post2(data);
    } else {
      //call put
      console.log(formCustomer);
      const selectedCustomer = customers[selectedRow];
      put(selectedCustomer.id, formCustomer);
    }
   setFormCustomer(blankCustomer);
   setSelectedRow(null);
   getCustomers();
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
  },[])

  const getCustomers = function(){        
    //log("in getCustomers()");
    getAll(setCustomers);
  }

  const formLabel = selectedRow === null ? "Add New Customer" : "Update Customer";

  return (
    <div className="App">
      <div className='fullbox'>
      <CustomerTable 
          customers={customers}
          handleRowClick={handleRowClick}
          selectedRow={selectedRow}>
      </CustomerTable>
      
      <CustomerAddUpdateForm
      
        formCustomer={formCustomer}
        formLabel={formLabel}
        handleInputChange={handleInputChange}
        handleAddClick={handleAddClick}
        handleCancelClick={handleCancelClick}
        handleDeleteClick={handleDeleteClick}
      >

      

      </CustomerAddUpdateForm>
            
    </div>
    </div>
  );
}

export default App;
