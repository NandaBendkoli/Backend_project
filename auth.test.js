// auth.test.js
const { authenticateUser, registerUser } = require('./auth');

test('registers and authenticates user with correct credentials', async () => {
  const username = 'testuser';
  const password = 'testpassword';
  
  await registerUser(username, password);
  const result = await authenticateUser(username, password);
  
  expect(result).not.toBeNull();
  expect(result.token).not.toBeNull();
});

test('fails to authenticate user with incorrect credentials', async () => {
  const result = await authenticateUser('testuser', 'wrongpassword');
  expect(result).toBeNull();
});
