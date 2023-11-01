import  { useState } from 'react';

import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validaFormulario = () => {
    const requestData = {
      username: userName,
      email: email,
      password: password,
    };

    fetch('http://localhost:3000/singUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar usuário');
        }

        // Tratar a resposta mesmo que ela seja vazia ou inválida
        return response.text();
      })
      .then((data) => {
        // Verifique se a resposta do servidor está vazia ou não é um JSON válido
        if (!data) {
          setSuccessMessage('Usuário cadastrado com sucesso');
        } else {
          // Se a resposta não estiver vazia, você pode processá-la de acordo com a lógica do servidor
          // Aqui você pode decidir como lidar com a resposta do servidor, se necessário
          // Por exemplo: setSuccessMessage('Usuário cadastrado com sucesso');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className='container'>
        <h2 className='mb-3'> Cadastro</h2>
        <div className="row">
          <input
            className='form-control mb-2 '
            type="text"
            placeholder='Insira seu username...'
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className='form-control mb-2 '
            type="email"
            placeholder='Insira seu email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='form-control mb-2 '
            type="password"
            placeholder='Insira sua senha'
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className='btn btn-success' onClick={validaFormulario}>
            Cadastrar
          </button>
        </div>
      </div>
      {error && <div className="error-message text-danger">Erro ao cadastrar usuário</div>}
      {successMessage && <div className="success-message text-primary">{successMessage}</div>}
    </>
  );
}

export default App;
