import React from "react";
import { List, Avatar } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Email } from "../types";

interface EmailListProps {
  emails: Email[];
  onSelect: (email: Email) => void;
  favorites: Set<string>;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  onSelect,
  favorites,
}) => (
  <List
    itemLayout="horizontal"
    dataSource={emails}
    renderItem={(email) => (
      <List.Item onClick={() => onSelect(email)} className="cursor-pointer">
        <List.Item.Meta
          avatar={
            <Avatar style={{ backgroundColor: "#1890ff" }}>
              {email.from.name[0].toUpperCase()}
            </Avatar>
          }
          title={
            <div className="flex justify-between">
              <span>{email.from.name}</span>
              <span className="text-xs text-gray-400">
                {new Date(email.date).toLocaleString("en-GB")}
              </span>
            </div>
          }
          description={email.subject}
        />
        {favorites.has(email.id) ? <StarFilled /> : <StarOutlined />}
      </List.Item>
    )}
  />
);

export default EmailList;
