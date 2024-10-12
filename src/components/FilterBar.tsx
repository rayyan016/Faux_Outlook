import React, { useState } from "react";
import { Button, Space } from "antd";

interface FilterBarProps {
  setFilter: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter); // Update the selected filter state
    setFilter(filter); // Call the passed setFilter function
  };

  return (
    <Space className="p-4">
      <Button
        onClick={() => handleFilterChange("all")}
        className={selectedFilter === "all" ? "bg-blue-500 text-white" : ""}
      >
        All
      </Button>
      <Button
        onClick={() => handleFilterChange("favorites")}
        className={
          selectedFilter === "favorites" ? "bg-blue-500 text-white" : ""
        }
      >
        Favorites
      </Button>
      <Button
        onClick={() => handleFilterChange("read")}
        className={selectedFilter === "read" ? "bg-blue-500 text-white" : ""}
      >
        Read
      </Button>
      <Button
        onClick={() => handleFilterChange("unread")}
        className={selectedFilter === "unread" ? "bg-blue-500 text-white" : ""}
      >
        Unread
      </Button>
    </Space>
  );
};

export default FilterBar;
