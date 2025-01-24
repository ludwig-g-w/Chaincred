import { render } from "@testing-library/react-native";
import { AnimatedTitle } from "../components/AnimatedTitle";

describe("AnimatedTitle", () => {
  it("renders animated title correctly", () => {
    const { getByTestId } = render(<AnimatedTitle />);
    expect(getByTestId("animated-title")).toBeTruthy();
  });
});
