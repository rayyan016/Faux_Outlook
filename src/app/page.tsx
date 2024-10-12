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
    return new Set();
  };

  const getReadFromStorage = (): Set<string> => {
    if (typeof window !== "undefined") {
      const storedRead = localStorage.getItem("readEmails");
      return new Set(storedRead ? JSON.parse(storedRead) : []);
    }
    return new Set();
  };

  const [favorites, setFavorites] = useState<Set<string>>(
    getFavoritesFromStorage()
  );

  const [readEmails, setReadEmails] = useState<Set<string>>(
    getReadFromStorage()
  );

  const [filter, setFilter] = useState<string>("all");

  // useEffect(() => {
  //   getEmails().then(setEmails);
  // }, []);

  useEffect(() => {
    getEmails().then((emails) => {
      const updatedEmails = emails.map((email) => ({
        ...email,
        read: readEmails.has(email.id),
      }));
      setEmails(updatedEmails);
    });
  }, [readEmails]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  //   }
  // }, [favorites]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
      localStorage.setItem(
        "readEmails",
        JSON.stringify(Array.from(readEmails))
      );
    }
  }, [favorites, readEmails]);

  const handleSelectEmail = (email: Email) => {
    // Mark email as read upon selection
    setEmails((prevEmails) =>
      prevEmails.map((e) => (e.id === email.id ? { ...e, read: true } : e))
    );

    setReadEmails((prev) => {
      const updated = new Set(prev);
      updated.add(email.id);
      return updated;
    });

    setSelectedEmail(email);
  };

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
    <Layout className="min-h-svh">
      {!selectedEmail ? (
        /** Full-width email list when no email is selected */
        <Content className="w-full bg-[#011528]">
          <FilterBar setFilter={setFilter} />
          <EmailList
            emails={filteredEmails}
            onSelect={handleSelectEmail}
            favorites={favorites}
          />
        </Content>
      ) : (
        /** Master-detail layout when an email is selected */
        <>
          <Sider width={400} className="transition-all duration-300">
            <FilterBar setFilter={setFilter} />
            <EmailList
              emails={filteredEmails}
              onSelect={handleSelectEmail}
              favorites={favorites}
            />
          </Sider>

          <div className="w-[1px] bg-gray-400"></div>

          <Content className="p-6 transition-all duration-300 bg-[#011528] text-gray-400">
            <EmailBody
              email={selectedEmail}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </Content>
        </>
      )}
    </Layout>
  );
};

export default Home;
