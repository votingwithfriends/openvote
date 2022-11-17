import { useState, useEffect } from "react";
import { setAccessToken } from "./token";
import { Router } from "./routes";
import React from "react";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3001/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Router />;
};
