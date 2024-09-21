import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../lib/dbConnect'; // Your database connection
import User from '../../../models/User'; // Your user model
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        const { email, password } = credentials;

        console.log('Credentials received:', { email, password });

        const user = await User.findOne({ email });

        if (!user) {
          console.log('No user found with this email');
          throw new Error('No user found with this email');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isValidPassword);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        // If all checks pass, return the user data
        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/signup',
    error: '/auth/error',
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      console.log('JWT token:', token);
      return token;
    },
  },
});
