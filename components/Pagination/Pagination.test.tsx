import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { Table } from "@tanstack/react-table";
import { TableDataType } from "@/types/submissions.types";

describe("Pagination Component", () => {
  const mockTable: Partial<Table<TableDataType>> = {
    getState: jest.fn().mockReturnValue({ pagination: { pageIndex: 0 } }),
    getPageCount: jest.fn().mockReturnValue(3),
    getCanPreviousPage: jest.fn().mockReturnValue(false),
    getCanNextPage: jest.fn().mockReturnValue(true),
    previousPage: jest.fn(),
    nextPage: jest.fn(),
    setPageIndex: jest.fn(),
  };

  test("renders pagination buttons", () => {
    render(<Pagination table={mockTable as Table<TableDataType>} />);

    expect(screen.getByText("«")).toBeInTheDocument();
    expect(screen.getByText("»")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("disables previous button when on first page", () => {
    render(<Pagination table={mockTable as Table<TableDataType>} />);
    expect(screen.getByText("«")).toBeDisabled();
  });

  test("enables next button if more pages are available", () => {
    render(<Pagination table={mockTable as Table<TableDataType>} />);
    expect(screen.getByText("»")).not.toBeDisabled();
  });

  test("calls setPageIndex when a page button is clicked", () => {
    render(<Pagination table={mockTable as Table<TableDataType>} />);

    const pageButton = screen.getByText("2");
    fireEvent.click(pageButton);

    expect(mockTable.setPageIndex).toHaveBeenCalledWith(1); // Page 2 (0-based index)
  });

  test("calls nextPage when next button is clicked", () => {
    render(<Pagination table={mockTable as Table<TableDataType>} />);

    const nextButton = screen.getByText("»");
    fireEvent.click(nextButton);

    expect(mockTable.nextPage).toHaveBeenCalled();
  });

  test("calls previousPage when previous button is clicked", () => {
    (mockTable.getCanPreviousPage as jest.Mock).mockReturnValue(true);

    render(<Pagination table={mockTable as Table<TableDataType>} />);

    const prevButton = screen.getByText("«");
    fireEvent.click(prevButton);

    expect(mockTable.previousPage).toHaveBeenCalled();
  });
});
