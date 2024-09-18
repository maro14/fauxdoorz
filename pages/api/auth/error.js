export default function Error({ error }) {
    return (
      <div>
        <h1>Error Occurred</h1>
        <p>{error}</p>
      </div>
    );
  }
  
  // This makes sure that you catch the error message.
  Error.getInitialProps = ({ query }) => {
    return {
      error: query.error || 'Unknown error',
    };
  };
  