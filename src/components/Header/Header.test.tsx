import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders Calendar text", () => {
  render(<Header title="Calendar" date="6.10.2021" />);
  const calendarElement = screen.getByText(/Calendar/i);
  const dateElement = screen.getByText(/6.10.2021/i);
  expect(calendarElement).toBeInTheDocument();
  expect(dateElement).toBeInTheDocument();
});
