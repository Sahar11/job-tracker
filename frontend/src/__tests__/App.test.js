import { render, screen } from "@testing-library/react";
import App from "../components/App";
import axios from "axios";

jest.mock("axios");


test("renders Tailwind heading", async () => {
  axios.get.mockResolvedValueOnce({ data: [] });
  render(<App />);
  const heading = screen.getByText(/AI Job Tracker/i);
  expect(heading).toBeInTheDocument();
});

// import { render, screen } from "@testing-library/react";
// import App from "../App";

// test("renders Data heading", () => {
//   render(<App />);
//   expect(screen.getByText(/data/i`)).toBeInTheDocument();
// });