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
    className=""
    renderItem={(email) => (
      <List.Item onClick={() => onSelect(email)} className="cursor-pointer rounded-md mx-2 hover:bg-[#28445f]">
        <List.Item.Meta
          avatar={
            <Avatar className="ml-1 bg-[#1890ff]" >
              {email.from.name[0].toUpperCase()}
            </Avatar>
          }
          title={
            <div>
              <div className="flex justify-between text-white">
                <span>From: {email.from.name}</span>
                <span className="text-xs text-gray-400">
                  {new Date(email.date).toLocaleString("en-GB")}
                </span>
              </div>
              <div></div>
              <span className="text-white">Subject: {email.subject}</span>
            </div>
          }
          description={
            <span className="text-white">{email.short_description}</span>
          }
        />
        <span className="text-white">
          {favorites.has(email.id) ? <StarFilled /> : <StarOutlined />}
        </span>
      </List.Item>
    )}
  />
);

export default EmailList;
