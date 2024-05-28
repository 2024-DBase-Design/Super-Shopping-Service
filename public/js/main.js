document.getElementById('addUserBtn').addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;

  if (!username || !email) {
    document.getElementById('message').innerText = 'Username and email are required.';
    return;
  }

  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email })
  });

  const result = await response.json();
  if (response.ok) {
    document.getElementById('message').innerText = 'User added successfully!';
  } else {
    document.getElementById('message').innerText = `Error: ${result.error}`;
  }
});
