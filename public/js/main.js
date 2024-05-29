document.getElementById('addCustomerBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value;

  if (!name) {
    document.getElementById('message').innerText = 'Name is required.';
    return;
  }

  const response = await fetch('http://localhost:3000/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  const result = await response.json();
  if (response.ok) {
    document.getElementById('message').innerText = 'Customer added successfully!';
  } else {
    document.getElementById('message').innerText = `Error: ${result.error}`;
  }
});
