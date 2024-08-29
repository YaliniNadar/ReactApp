const baseURL = 'http://localhost:4000/customers';

export async function getAll(setCustomers) {
  const myInit = {
    method: 'GET',
    mode: 'cors' };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
        setCustomers(data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData(baseURL);
  }

  export async function post(newCustomer) { 
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      });

      if (!response.ok) {
        throw new Error(`Error posting data: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      return result;

    } catch (error) {
      alert(error);
    }
  }

  export async function put(id, customer){
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer) 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      return result;

    } catch (error) {
      alert(error)
    }
  }

  


// export function get(id) {
//     let result = null;
//     for( let item of items){
//         if(item.id === id){
//             result = item;
//         }
//     }
//   return result;
// }

// export function deleteById(id) {
//   let arrayIndex = getArrayIndexForId(id);
//   if( arrayIndex >= 0 && arrayIndex < items.length){
//     items.splice(arrayIndex,1);
//   }
// }

// export function post(item) {
//   let nextid = getNextId();
//   item.id = nextid;
//   items[items.length] = item;
// }



// export function put(id, item) {
//   for( let i = 0; i < items.length; i++){
//     if(items[i].id === id){
//       items[i] = item;
//       return;
//     }
//   }
// }

// function getArrayIndexForId(id){
//   for( let i = 0; i < items.length; i++){
//     if(items[i].id === id){
//       return i;
//     }
//   }
//   return -1;  
// }


// function getNextId(){
//   let maxid = 0;
//   for( let item of items){
//     maxid = (item.id > maxid)?item.id:maxid;
//   }  
//   return maxid + 1;
// }


