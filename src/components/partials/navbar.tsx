"use client";

import { locales, type AppLocale } from "@/common/i18n";

export default function NavigationBar({ lang }: { lang: AppLocale }) {
  return (
    <nav
      id="navigation-bar"
      className="w-full px-4 md:px-8 absolute top-4 z-50 transition-all duration-300 ease-in-out bg-transparent"
    >
      <div className="w-full h-16 flex items-center justify-end">
        <div className="flex items-center justify-center text-center gap-3">
          {/* Every language shares one URL, so these switch the language in
              place (intro-animation.tsx closes the curtain, then reloads) */}
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              lang={locale}
              aria-pressed={locale === lang}
              onClick={() => {
                if (locale === lang) return;
                window.dispatchEvent(
                  new CustomEvent("page-transition", { detail: { locale } }),
                );
              }}
              className="cursor-pointer opacity-100 md:opacity-50 hover:opacity-100 duration-500 ease-out w-14 h-14 bg-transparent text-xl tracking-tight text-neutral-200 px-3 py-2 border border-neutral-200 group flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <span className="relative block h-6 overflow-hidden">
                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-7">
                  {/* Uppercase in the text itself, so the accessible name
                      matches what is shown ("ID", not "id") */}
                  <span className="block -translate-y-0.5">
                    {locale.toUpperCase()}
                  </span>
                  <span aria-hidden="true" className="block -translate-y-0.5">
                    {locale.toUpperCase()}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
