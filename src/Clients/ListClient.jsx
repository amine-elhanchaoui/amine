import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteClient, updateClient } from '../ReduxTp/Action.js';

// ListClient: shows table of clients and allows edit/delete
export default function ListClient() {
  const clients = useSelector((state) => state.clientsState.clients);
  const dispatch = useDispatch();

  // Local edit state: id being edited and temporary values
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const startEdit = (client) => {
    setEditingId(client.id);
    setName(client.name);
    setEmail(client.email);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setEmail('');
  };

  const saveEdit = () => {
    dispatch(updateClient({ id: editingId, name, email }));
    cancelEdit();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Clients</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id} style={{ borderTop: '1px solid #ddd' }}>
              <td>
                {editingId === c.id ? (
                  <input value={name} onChange={(e) => setName(e.target.value)} />
                ) : (
                  c.name
                )}
              </td>
              <td>
                {editingId === c.id ? (
                  <input value={email} onChange={(e) => setEmail(e.target.value)} />
                ) : (
                  c.email
                )}
              </td>
              <td>
                {editingId === c.id ? (
                  <>
                    <button onClick={saveEdit}>Save</button>{' '}
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(c)}>Edit</button>{' '}
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this client?')) dispatch(deleteClient(c.id));
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
