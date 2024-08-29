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

export async function deleteById(id) {
  try {
    const url = `${baseURL}/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Customer with ID ${id} deleted successfully`);
  }
  catch(error) {
    alert(error)
  }
}

export async function get(id){
  try {
    const url = `${baseURL}/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`)
    }
    const data = await response.json();
    console.log('Successfully retrived customer:', data);
    return data;
  } catch (error) {
    alert(error)
  }
}
