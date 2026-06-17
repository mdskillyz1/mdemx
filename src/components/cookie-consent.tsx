import Link from "next/link";

const CONSENT_KEY = "mdemx-cookie-consent-v1";

export function CookieConsent() {
  return (
    <div
      id="cookie-consent"
      className="fixed bottom-24 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-3xl border border-[var(--line)] bg-[#07110c]/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:bottom-6 md:left-6 md:translate-x-0"
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-base font-semibold text-white">Cookie preferences</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            MDemx uses essential cookies now and has placeholders ready for analytics once configured.
            Review the cookie policy for details.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/cookie-policy"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-white transition hover:border-[var(--mint)]"
          >
            Cookie Policy
          </Link>
          <button
            type="button"
            data-cookie-accept
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c] transition hover:bg-white"
          >
            Accept
          </button>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var key = ${JSON.stringify(CONSENT_KEY)};
              var banner = document.getElementById('cookie-consent');
              try {
                if (window.localStorage && window.localStorage.getItem(key) === 'accepted' && banner) {
                  banner.style.display = 'none';
                }
              } catch (error) {}
              var button = document.querySelector('[data-cookie-accept]');
              if (button && banner) {
                button.addEventListener('click', function () {
                  try {
                    if (window.localStorage) window.localStorage.setItem(key, 'accepted');
                  } catch (error) {}
                  banner.style.display = 'none';
                });
              }
            })();
          `,
        }}
      />
    </div>
  );
}
