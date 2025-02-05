import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../utils/dbConnect'; // Your database connection
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
        try {
          await dbConnect();

          // Check if credentials exist
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please provide both email and password');
          }

          // Find user and explicitly select password field
          const user = await User.findOne({ email: credentials.email }).select('+password');
          
          if (!user) {
            throw new Error('No user found with this email');
          }

          // Debug log (remove in production)
          console.log('Found user:', user.email);

          // Ensure password exists
          if (!user.password) {
            throw new Error('User has no password set');
          }

          // Compare passwords
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // Debug log (remove in production)
          console.log('Password valid:', isValid);

          if (!isValid) {
            throw new Error('Invalid password');
          }

          // Return user without password
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error details:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
});
