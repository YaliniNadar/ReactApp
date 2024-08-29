import './App.css';
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm';
// import {get} from './memdb';
import {getAll, post, put, deleteById, get} from './restdb';
import { useState, useEffect } from 'react';
import CustomerTable from './components/CustomerTable';

function App() {

  let blankCustomer = {"id": -1, "name":"", "email": "", "password": ""};
  const [currId, setCurrID] = useState(101);
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

  async function handleRowClick(index) {
    console.log(index);
    if(selectedRow === index) {
      setSelectedRow(null);
      setFormCustomer(blankCustomer);
    } else {
      setSelectedRow(index);
      const selectedCustomer = await get(index);
      console.log(selectedCustomer);
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
      console.log("Getting ready to post data")
      console.log(data);
      post(data);

    } else {
      //call put
      console.log("Getting ready to update the customer")
      console.log(formCustomer);
      console.log(selectedRow)
      // const selectedCustomer = get(selectedRow);
      put(selectedRow, formCustomer);
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
  },[formCustomer])

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
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          setFormCustomer={setFormCustomer}
          blankCustomer={blankCustomer}
          >
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
