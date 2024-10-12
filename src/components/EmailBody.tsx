import React, { useEffect, useState } from "react";
import { getEmailBody } from "../services/emailService";
import { Email } from "../types";
import { Button, Spin } from "antd";

interface EmailBodyProps {
  email: Email;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const EmailBody: React.FC<EmailBodyProps> = ({
  email,
  favorites,
  onToggleFavorite,
}) => {
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEmailBody = async () => {
      setLoading(true); 
      try {
        const data = await getEmailBody(email.id);
        setBody(data.body);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailBody();
  }, [email]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{email.subject}</h2>

      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <Spin size="large" />
        </div>
      ) : (
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: body }} // Render HTML content safely
        />
      )}

      <p className="text-sm text-gray-500 mt-2">
        {new Date(email.date).toLocaleString("en-GB")}
      </p>

      <Button
        type="primary"
        className="mt-4"
        onClick={() => onToggleFavorite(email.id)}
      >
        {favorites.has(email.id) ? "Unmark Favorite" : "Mark as Favorite"}
      </Button>
    </div>
  );
};

export default EmailBody;
