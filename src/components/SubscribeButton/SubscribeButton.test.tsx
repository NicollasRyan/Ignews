import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock("next-auth/react");
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("SubscribeButton Component", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SubscribeButton />);

    expect(screen.getByText(/Subscribe now/i)).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    const signMocked = mocked(signIn);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText(/Subscribe now/i);

    fireEvent.click(subscribeButton);

    expect(signMocked).toHaveBeenCalled();
  });

  it("redirect to posts when user already has a subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.doe@exemple.com",
        },
        activeSubscription: "fake-active-subscription",
        expires: "fake-expires",
      },
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText(/Subscribe now/i);

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
