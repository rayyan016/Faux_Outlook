"use client";

import React from "react";
import { Button, ConfigProvider, Result } from "antd";

export default function Loading() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#ffffff",
          colorTextDescription: "#ffffff",
        },
      }}
    >
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        className="mt-16"
        extra={
          <Button
            type="primary"
            href="https://github.com/rayyan016"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Admin
          </Button>
        }
      />
    </ConfigProvider>
  );
}
