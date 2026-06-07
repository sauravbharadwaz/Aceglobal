import Link from "next/link";

const links = {
  Company: ["About Us", "Careers", "Contact"],
  Platform: ["Bookkeeping", "TaxPass", "Pricing"],
  Resources: ["Blog", "Calculators", "Community"],
  Support: ["Help Center", "Privacy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="bg-[#172d65] pt-[120px] pb-12">
      <div className="max-w-[1280px] mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-6 block">
              Ace Global
            </Link>
            <p className="text-[#dbe1ff]/60 mb-8 max-w-xs leading-relaxed text-sm">
              Helping founders build better companies by making finance effortless.
            </p>
            <div className="flex gap-4">
              {/* Twitter */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#0053ce] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#0053ce] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-white text-sm font-semibold mb-6">{heading}</p>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-[#dbe1ff]/60 hover:text-white text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#dbe1ff]/40 text-xs">
            © {new Date().getFullYear()} Ace Global. All rights reserved.
          </p>
          {/* Newsletter */}
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-full px-4">
            <span className="text-[#dbe1ff]/60 text-xs">Join the newsletter</span>
            <input
              type="email"
              placeholder="email@company.com"
              className="bg-transparent border-none text-white text-xs focus:outline-none w-32 placeholder:text-white/30"
            />
            <button className="bg-[#0053ce] text-white w-6 h-6 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
