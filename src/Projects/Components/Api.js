import { useState, useEffect } from "react";

export function useApiJson(url) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data.users || []);
    }

    load();
  }, [url]);

  return users;
}
