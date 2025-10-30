export default function Footer() {
  return (
    <footer className="bg-green-600 border-t border-green-700 shadow-md flex flex-col items-center justify-center p-1 text-sm text-white">
      <p>© {new Date().getFullYear()} IFPE</p>
    </footer>
  );
}
