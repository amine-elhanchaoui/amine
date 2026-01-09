import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Search clients by name or email, show results live
export default function RechercheClient() {
  const clients = useSelector((state) => state.clientsState.clients);
  const [query, setQuery] = useState('');

  const q = query.toLowerCase();
  const filtered = clients.filter(
    (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recherche Client</h2>
      <input
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filtered.map((c) => (
          <li key={c.id}>{c.name} — {c.email}</li>
        ))}
      </ul>

      {filtered.length === 0 && <p>No results</p>}
    </div>
  );
}
