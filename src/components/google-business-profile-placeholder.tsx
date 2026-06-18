import { MapPin, MessageSquareText, Navigation, Phone, Star } from "lucide-react";
import { site } from "@/lib/site";

const googleBusinessProfileEnabled = false;

const placeholderReviews = [
  {
    author: "Future Google reviewer",
    rating: 5,
    text: "Placeholder review text ready for Google Business Profile integration.",
  },
];

export function GoogleBusinessProfilePlaceholder() {
  if (!googleBusinessProfileEnabled) {
    return null;
  }

  return (
    <section className="container-shell py-16 md:py-24" aria-labelledby="google-business-profile-title">
      <div className="grid gap-8 rounded-[2rem] border border-[var(--line)] bg-white/[0.045] p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--mint)]">Google Business Profile</p>
          <h2 id="google-business-profile-title" className="mt-3 text-3xl font-semibold text-white">
            MDemx reviews, rating, location, and business information
          </h2>
          <div className="mt-5 flex items-center gap-2 text-[var(--mint)]" aria-label="Google rating placeholder">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={18} fill="currentColor" />
            ))}
            <span className="ml-2 text-sm font-semibold text-white">Google rating placeholder</span>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-[var(--muted)]">
            <p className="flex items-center gap-3">
              <MapPin size={17} className="text-[var(--mint)]" />
              {site.location}
            </p>
            <p>Opening hours placeholder: Monday to Friday, 9:00 to 18:00</p>
            <p>Business information placeholder ready for Google API or manual Google Business Profile data.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--mint)] px-5 text-sm font-semibold text-[#07110c]"
            >
              <Phone size={16} />
              Call MDemx
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=MDemx%20London&destination_place_id=${site.googlePlaceId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)]"
            >
              <Navigation size={16} />
              Directions
            </a>
            <a
              href={site.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 text-sm font-semibold text-[var(--mint)]"
            >
              <MessageSquareText size={16} />
              Leave a Google review
            </a>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="min-h-64 rounded-3xl border border-[var(--line)] bg-white/[0.035] p-5">
            <p className="text-sm font-semibold text-white">Google Maps embed placeholder</p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Ready for a Google Maps iframe or Places API component using Place ID {site.googlePlaceId}.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {placeholderReviews.map((review) => (
              <article key={review.author} className="rounded-3xl border border-[var(--line)] bg-white/[0.035] p-5">
                <p className="text-sm font-semibold text-white">{review.author}</p>
                <p className="mt-2 text-xs text-[var(--mint)]">{review.rating} star Google review</p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
