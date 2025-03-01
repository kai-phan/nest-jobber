const AUTH_URL = 'http://localhost:3000/graphql';
const JOB_URL = 'http://localhost:3001/graphql';

const LOGIN_MUTATION = `
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      id,
    }
  }
`;

const JOB_EXECUTION_MUTATION = `
  mutation executeJob($name: String!, $data: JSON!) {
    executeJob(jobInput: { name: $name, data: $data }) {
      name,
    }
  }
`;

const login = async (email, password) => {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: LOGIN_MUTATION,
      variables: { email, password },
    }),
  });

  const data = await response.json();
  const token = response.headers.get('set-cookie');
  return { data, token };
};

const jobExecute = async (jobInput) => {
  const { token } = await login('test@gmail.com', 'Nguyenthanhhaii1#');

  const response = await fetch(JOB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: token,
    },
    body: JSON.stringify({
      query: JOB_EXECUTION_MUTATION,
      variables: {
        name: jobInput.name,
        data: Array.from({ length: 500 }, () => {
          return {
            iteration: Math.floor(Math.random() * 100) + 1,
          };
        }),
      },
    }),
  });

  const data = await response.json();
  console.log(data);
  return data;
};

jobExecute({ name: 'fibonacci' });
