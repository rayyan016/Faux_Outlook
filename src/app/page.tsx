"use client";

import React, { useState, useEffect } from "react";
import { ConfigProvider, Layout, Pagination, Spin } from "antd";
import { Email } from "../types";
import EmailList from "../components/EmailList";
import EmailBody from "../components/EmailBody";
import FilterBar from "../components/FilterBar";
import { getEmails } from "../services/emailService";

const { Content, Sider } = Layout;

const Home: React.FC = () => {
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

  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(
    getFavoritesFromStorage()
  );
  const [readEmails, setReadEmails] = useState<Set<string>>(
    getReadFromStorage()
  );
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalEmails, setTotalEmails] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const PAGE_SIZE = 10; // Fixed page size

  useEffect(() => {
    setLoading(true);
    try {
      fetchEmails(currentPage);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchEmails = async (page: number) => {
    const data = await getEmails(page);
    const updatedEmails = data.list.map((email: Email) => ({
      ...email,
      read: readEmails.has(email.id),
    }));
    setEmails(updatedEmails);
    setTotalEmails(data.total);
  };

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
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated; // Explicit return ensures no warning
    });
  };

  const filteredEmails = emails.filter((email) => {
    if (filter === "favorites") return favorites.has(email.id);
    if (filter === "read") return email.read;
    if (filter === "unread") return !email.read;
    return true;
  });

  return (
    <Layout className="min-h-svh mb-6">
      {!selectedEmail ? (
        /** Full-width email list when no email is selected */
        <Content className="w-full bg-[#011528]">
          <FilterBar setFilter={setFilter} />
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" />
            </div>
          ) : (
            <EmailList
              emails={filteredEmails}
              onSelect={handleSelectEmail}
              favorites={favorites}
            />
          )}

          {/* Pagination Component */}
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  colorBgTextHover: "#007bff",
                  colorText: "#ffffff",
                  colorTextDisabled: "#ffffff",
                  colorBgContainer: "#000000",
                },
              },
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={totalEmails}
              onChange={(page) => setCurrentPage(page)}
              className="mt-4"
              hideOnSinglePage
              align="center"
            />
          </ConfigProvider>
        </Content>
      ) : (
        /** Master-detail layout when an email is selected */
        <>
          <Sider width={400} className="transition-all duration-300">
            <FilterBar setFilter={setFilter} />
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Spin size="large" />
              </div>
            ) : (
              <EmailList
                emails={filteredEmails}
                onSelect={handleSelectEmail}
                favorites={favorites}
              />
            )}
            {/* Pagination Component */}
            <ConfigProvider
              theme={{
                components: {
                  Pagination: {
                    colorBgTextHover: "#007bff",
                    colorText: "#ffffff",
                    colorTextDisabled: "#ffffff",
                    colorBgContainer: "#000000",
                  },
                },
              }}
            >
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={totalEmails}
                onChange={(page) => setCurrentPage(page)}
                className="mt-4"
                hideOnSinglePage
                align="center"
              />
            </ConfigProvider>
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
