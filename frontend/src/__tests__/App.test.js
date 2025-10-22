import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Tailwind heading", () => {
  render(<App />);
  const heading = screen.getByText(/Tailwind is working!/i);
  expect(heading).toBeInTheDocument();
});