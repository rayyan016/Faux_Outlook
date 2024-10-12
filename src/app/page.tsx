"use client";

import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Email } from "../types";
import EmailList from "../components/EmailList";
import EmailBody from "../components/EmailBody";
import FilterBar from "../components/FilterBar";
import { getEmails } from "../services/emailService";

const { Content, Sider } = Layout;

const Home: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const getFavoritesFromStorage = (): Set<string> => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favorites");
      return new Set(storedFavorites ? JSON.parse(storedFavorites) : []);
    }
    return new Set(); // Return an empty set for SSR.
  };

  const [favorites, setFavorites] = useState<Set<string>>(
    getFavoritesFromStorage()
  );

  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    getEmails().then(setEmails);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
    }
  }, [favorites]);

  const handleSelectEmail = (email: Email) => setSelectedEmail(email);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === "favorites") return favorites.has(email.id);
    if (filter === "read") return email.read;
    if (filter === "unread") return !email.read;
    return true;
  });

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={300}>
        <FilterBar setFilter={setFilter} />
        <EmailList
          emails={filteredEmails}
          onSelect={handleSelectEmail}
          favorites={favorites}
        />
      </Sider>
      <Content>
        {selectedEmail && (
          <EmailBody email={selectedEmail} onToggleFavorite={toggleFavorite} />
        )}
      </Content>
    </Layout>
  );
};

export default Home;
