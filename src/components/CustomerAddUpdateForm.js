import React from "react";

function CustomerAddUpdateForm(props) {

    return (

        <div className='wrapper'>        
          <div className='list-box'>
          <h3>{props.formLabel}</h3>
         
<form>
  <table>
      <tr>
        <td>Name: </td>
        <td>
        <input id="nameText" type="text" value={props.formCustomer.name} onChange={(e) => props.handleInputChange(e)}></input>
        </td>
      </tr>
      <tr>
        <td>Email: </td>
        <td>
        <input type="email"value={props.formCustomer.email} onChange={(e) => props.handleInputChange(e)}></input>
        </td>
      </tr>
      <tr>                    
        <td>Password: </td>
        <td>
        <input type="text" value={props.formCustomer.password} onChange={(e) => props.handleInputChange(e)}></input>
        </td>
      </tr>
      
  </table>

  <input type="button" value="Delete" onClick={props.handleDeleteClick}>
        </input>
        <input type="button" value="Save" onClick={props.handleAddClick}>
        </input>
        <input type="button" value="Cancel" onClick={props.handleCancelClick}>
        </input>

      </form>
        </div>
        </div>
    );
}

export default CustomerAddUpdateForm;
