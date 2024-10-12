import React, { useState } from "react";
import { Button, ConfigProvider, Space } from "antd";

interface FilterBarProps {
  setFilter: (filter: string) => void;
}

interface FilterButtonProps {
  filter: string;
  label: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ setFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter); // Update the selected filter state
    setFilter(filter); // Call the passed setFilter function
  };

  // Array of filters
  const filters = [
    { filter: "all", label: "All" },
    { filter: "favorites", label: "Favorites" },
    { filter: "read", label: "Read" },
    { filter: "unread", label: "Unread" },
  ];

  // Reusable button component
  const FilterButton: React.FC<FilterButtonProps> = ({ filter, label }) => (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultHoverBg: "#1e293b",
            defaultBg: selectedFilter === filter ? "#1e293b" : undefined,
            defaultActiveBg: "#1e293b",
            defaultColor: "#ffffff",
          },
        },
      }}
    >
      <Button
        onClick={() => handleFilterChange(filter)}
        className={selectedFilter === filter ? "bg-blue-500 text-white" : ""}
      >
        {label}
      </Button>
    </ConfigProvider>
  );

  return (
    <Space className="p-4">
      {filters.map(({ filter, label }) => (
        <FilterButton key={filter} filter={filter} label={label} />
      ))}
    </Space>
  );
};

export default FilterBar;
