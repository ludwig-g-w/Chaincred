import { render, fireEvent } from "@testing-library/react-native";
import MainButton from "../MainButton";

// Test actual behavior
it("triggers onPress when pressed", () => {
  const onPressMock = jest.fn();
  const { getByText } = render(
    <MainButton onPress={onPressMock}>Press Me</MainButton>
  );

  const button = getByText("Press Me");
  fireEvent.press(button);
  expect(onPressMock).toHaveBeenCalledTimes(1);
});

// Test loading state
it("shows loading indicator when loading is true", () => {
  const { getByTestId } = render(<MainButton loading>Loading</MainButton>);

  const spinner = getByTestId("loading-spinner");
  expect(spinner).toBeTruthy();
});
