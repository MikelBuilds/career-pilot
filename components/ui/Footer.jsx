import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600">
        <p>
          © {new Date().getFullYear()} CareerPilot. All rights reserved.
        </p>

        <p className="mt-2 sm:mt-0">
          Built with focus, not hype.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
