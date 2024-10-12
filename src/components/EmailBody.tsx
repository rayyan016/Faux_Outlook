import React, { useEffect, useState } from "react";
import { getEmailBody } from "../services/emailService";
import { Email } from "../types";
import { Button } from "antd";

interface EmailBodyProps {
  email: Email;
  favorites: Set<string>; // Pass the favorites set as a prop
  onToggleFavorite: (id: string) => void;
}

const EmailBody: React.FC<EmailBodyProps> = ({
  email,
  favorites,
  onToggleFavorite,
}) => {
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    getEmailBody(email.id).then((data) => setBody(data.body));
  }, [email]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{email.subject}</h2>

      {/* Render the HTML content from the email body */}
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: body }} // Render HTML content safely
      />

      <p className="text-sm text-gray-500 mt-2">
        {new Date(email.date).toLocaleString("en-GB")}
      </p>

      <Button
        type="primary"
        className="mt-4"
        onClick={() => onToggleFavorite(email.id)}
      >
        {/* Check if the email is in favorites to toggle the button text */}
        {favorites.has(email.id) ? "Unmark Favorite" : "Mark as Favorite"}
      </Button>
    </div>
  );
};

export default EmailBody;
