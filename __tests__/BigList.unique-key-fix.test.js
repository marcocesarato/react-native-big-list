import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";

import BigList from "../lib/BigList";

describe("BigList Unique Key Fix", () => {
  const mockData = [
    { title: "Item 1", description: "Description 1" },
    { title: "Item 2", description: "Description 2" },
    { title: "Item 3", description: "Description 3" },
  ];

  const mockSections = [
    [
      { title: "Section 1 Item 1", description: "Description 1.1" },
      { title: "Section 1 Item 2", description: "Description 1.2" },
    ],
    [
      { title: "Section 2 Item 1", description: "Description 2.1" },
      { title: "Section 2 Item 2", description: "Description 2.2" },
    ],
  ];

  const renderItem = ({ item }) => (
    <Text>{item.title}</Text>
  );

  it("should handle section and index calculations with valid numbers", () => {
    const { getByText } = render(
      <BigList
        sections={mockSections}
        itemHeight={50}
        renderItem={renderItem}
        containerHeight={200}
      />
    );

    // Should render without errors even if internal calculations occur
    expect(getByText("Section 1 Item 1")).toBeTruthy();
  });

  it("should render sections without NaN in unique key calculations", () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <BigList
        sections={mockSections}
        itemHeight={50}
        renderItem={renderItem}
        containerHeight={200}
      />
    );

    // Check that no React key-related errors were logged
    const keyErrors = consoleSpy.mock.calls.filter(call => 
      call.some(arg => 
        typeof arg === 'string' && (
          arg.includes('key') || 
          arg.includes('unique') || 
          arg.includes('NaN')
        )
      )
    );

    expect(keyErrors).toHaveLength(0);
    consoleSpy.mockRestore();
  });

  it("should handle empty sections gracefully", () => {
    const emptySections = [[], []];
    
    const renderResult = render(
      <BigList
        sections={emptySections}
        itemHeight={50}
        renderItem={renderItem}
        containerHeight={200}
      />
    );

    // Should render without throwing errors
    expect(renderResult).toBeTruthy();
  });

  it("should handle mixed empty and non-empty sections", () => {
    const mixedSections = [
      [{ title: "Item 1", description: "Desc 1" }],
      [], // Empty section
      [{ title: "Item 2", description: "Desc 2" }],
    ];
    
    const { getByText } = render(
      <BigList
        sections={mixedSections}
        itemHeight={50}
        renderItem={renderItem}
        containerHeight={200}
      />
    );

    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
  });
});