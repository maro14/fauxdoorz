export default function Footer() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Your main content goes here */}
      </main>
      <footer className="bg-gray-100 py-10">
        <div className="container mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}