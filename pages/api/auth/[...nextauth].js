import NextAuth from "next-auth";
import { hashRole } from "../../../lib/auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const enteredEmail = credentials.email
          .toLowerCase()
          .replace(/\s+/g, "");

        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: enteredEmail,
        });

        if (!user) {
          client.close();
          throw new Error("Überprüfen Sie bitte die eingegebene E-Mail-Adresse und versuchen Sie es noch einmal.");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Überprüfen Sie bitte das eingegebene Passwort und versuchen Sie es noch einmal.");
        }
        
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
