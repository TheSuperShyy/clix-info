import { ParticleHeroLab } from "@/components/ParticleHeroLab";

/**
 * /lab — test page for the experimental shape-morphing RGB particle hero
 * (expand-in intro → logo → circle → square → triangle → loop). The home hero
 * is unchanged; this uses a separate lab component so we can iterate freely.
 */
export const metadata = {
  title: "Lab · shape-morph hero",
  robots: { index: false, follow: false },
};

export default function Lab() {
  return (
    <>
      <ParticleHeroLab />

      {/* Filler content that slides up over the pinned hero — lets us test the
          full scroll-build + sticky reveal with the alive motion. */}
      <div className="relative z-10 bg-background" dir="rtl">
        <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            lab · alive hero test
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-semibold tracking-[-0.03em]">
            תוכן שמחליק מעל ההירו
          </h2>
          <p className="mt-3 max-w-md text-muted">
            גוללו למעלה ולמטה כדי לבדוק את הבנייה והתנועה החיה. גררו את הסמן כדי
            לסובב את הלוגו.
          </p>
        </section>
        <section className="flex min-h-screen items-center justify-center px-6 text-center">
          <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-semibold tracking-[-0.03em]">
            עוד תוכן לבדיקת הגלילה
          </h2>
        </section>
      </div>
    </>
  );
}
