import React, { useEffect, useState } from "react";
import { getEmailBody } from "../services/emailService";
import { Email } from "../types";
import { Button } from "antd";

interface EmailBodyProps {
  email: Email;
  onToggleFavorite: (id: string) => void;
}

const EmailBody: React.FC<EmailBodyProps> = ({ email, onToggleFavorite }) => {
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    getEmailBody(email.id).then((data) => setBody(data.body));
  }, [email]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{email.subject}</h2>
      <p className="mt-4">{body}</p>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(email.date).toLocaleString("en-GB")}
      </p>
      <Button
        type="primary"
        className="mt-4"
        onClick={() => onToggleFavorite(email.id)}
      >
        {email.favorite ? "Unmark Favorite" : "Mark as Favorite"}
      </Button>
    </div>
  );
};

export default EmailBody;
