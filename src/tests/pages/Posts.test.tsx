import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";
import { mocked } from "jest-mock";
import { getPrismicClient } from "../../services/prismic";

const post = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post excerpt",
    updatedAt: "March, 26",
  },
];

jest.mock("../../services/prismic");

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("Loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "03-16-2023",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "Post excerpt",
              updatedAt: "16 de março de 2023",
            },
          ],
        },
      })
    );
  });
});
