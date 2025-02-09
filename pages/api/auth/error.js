export default function Error({ error }) {
  // Add error types mapping
  const errorMessages = {
    'CredentialsSignin': 'Invalid email or password',
    'AccessDenied': 'You do not have permission to access this resource',
    'Default': 'An unexpected error occurred'
  };

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{errorMessages[error] || errorMessages.Default}</p>
    </div>
  );
}

// This makes sure that you catch the error message.
Error.getInitialProps = ({ query }) => {
  return {
    error: query.error || 'Unknown error',
  };
};
  