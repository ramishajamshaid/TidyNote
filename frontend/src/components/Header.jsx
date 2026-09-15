import { Search, Bell, CircleHelp, Command, PencilSparkles } from "lucide-react";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="fixed top-0 w-full backdrop-blur-2xl h-14 bg-transparent border-b border-border tablet:relative flex items-center justify-between gap-2 px-4 mobile:px-6">

      {/* Left */}
      <div className="flex items-center justify-between tablet:hidden">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-[18px] tracking-wide text-heading font-poppins">
            TidyNote
          </span>
          <span className="w-6 h-6 rounded-lg bg-purple-light flex items-center justify-center text-purple-dark">
            <PencilSparkles size={16} />
          </span>
        </div>
      </div>

      {/* Center */}
      <div className="w-full h-full max-w-md flex justify-start items-center">
        <div className="w-full hidden mobile:flex items-center gap-2 border border-neutral-200 bg-white py-1 rounded-xl px-3 focus-within:border-purple-dark transition-all">
          <Search size={16} className="text-text shrink-0" />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-transparent outline-none text-sm text-heading placeholder:text-description"
          />

          <span className="flex justify-center items-center gap-0.5 text-[12px] whitespace-nowrap text-purple-dark border border-neutral-200 bg-purple-light rounded-md px-1.5 py-0.5">
            <Command size={12} /> K
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        <Search size={18} className="flex mobile:hidden text-text shrink-0" />
        <button
          className="w-8 h-8 flex items-center justify-center bg-transparent rounded-full text-text hover:bg-purple-light hover:text-purple-dark transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 tablet:w-5 tablet:h-5" />
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center bg-transparent rounded-full text-text hover:bg-purple-light hover:text-purple-dark transition-colors cursor-pointer"
          aria-label="Help"
        >
          <CircleHelp className="w-4 h-4 tablet:w-5 tablet:h-5" />
        </button>

      </div>
    </header>
  );
};

export default Header;