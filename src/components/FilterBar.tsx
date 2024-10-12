import React from "react";
import { Button, Space } from "antd";

interface FilterBarProps {
  setFilter: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setFilter }) => (
  <Space className="p-4">
    <Button onClick={() => setFilter("all")}>All</Button>
    <Button onClick={() => setFilter("favorites")}>Favorites</Button>
    <Button onClick={() => setFilter("read")}>Read</Button>
    <Button onClick={() => setFilter("unread")}>Unread</Button>
  </Space>
);

export default FilterBar;
