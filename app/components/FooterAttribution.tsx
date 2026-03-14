export default function FooterAttribution() {
  return (
    <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col sm:flex-row items-center justify-center gap-2">
      <p>&copy; {new Date().getFullYear()} Shannon Muruli. All rights reserved.</p>
      <span className="hidden sm:inline text-gray-600">·</span>
      <p>
        Powered by{' '}
        <a
          href="https://automagicly.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#a08216] transition-colors font-medium"
        >
          AutoMagicly
        </a>
      </p>
    </div>
  );
}
