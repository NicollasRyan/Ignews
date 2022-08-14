import { query as q } from "faunadb"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from "../../../services/fauna"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user

      try {
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          ),
          q.Create(
            q.Collection('user'),
            {data: { email } }
          ),
          q.Get(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(user.email)
            )
          )
        )

        return true
      } catch {
        return false
      }

    },
  }
})