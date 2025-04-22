import { getByText, render } from "@testing-library/react";
import Card from "../components/Card";

const mockMovie = {
  id: 1,
  content: "This is a khatra movie",
  title: "Inception",
};

test("movie card rendering", () => {
  render(<Card title={mockMovie.title} />);
  expect(screen.getByText("Inception").tobeinTheDocument());
});
