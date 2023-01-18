import { render } from "@testing-library/react";
import App from "next/app";
import DataBaseElements from "../pages/home/organisms/bpmElements";

test("TopPage", () => {
  render(<App/> );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
