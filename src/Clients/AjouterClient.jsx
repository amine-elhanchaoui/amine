import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addClient } from '../ReduxTp/Action.js';
import { useNavigate } from 'react-router-dom';

// Simple form to add a client
export default function AjouterClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const client = { id: Date.now(), name, email };
    dispatch(addClient(client));
    // redirect to list page
    navigate('/listclient');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ajouter Client</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name</label>
          <br />
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginTop: '8px' }}>
          <label>Email</label>
          <br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div style={{ marginTop: '12px' }}>
          <button type="submit">Add Client</button>
        </div>
      </form>
    </div>
  );
}
