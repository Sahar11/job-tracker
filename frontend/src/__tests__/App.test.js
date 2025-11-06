import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renders Tailwind heading", () => {
  render(<App />);
  const heading = screen.getByText(/Tailwind is working!/i);
  expect(heading).toBeInTheDocument();
});
// import { render, screen } from "@testing-library/react";
// import App from "../App";

// test("renders Data heading", () => {
//   render(<App />);
//   expect(screen.getByText(/data/i)).toBeInTheDocument();
// });