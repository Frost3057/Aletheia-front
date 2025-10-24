import { FormEvent, useState } from "react";

export type UserType = "normal" | "journalist";

interface SlideProps {
  onSearchClick?: (query: string, userType: UserType) => Promise<void> | void;
}

export const Slide = (_props: SlideProps): JSX.Element => {
  const { onSearchClick } = _props;
  const [rumorQuery, setRumorQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleRumorSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = rumorQuery.trim();

    if (!trimmedQuery) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      if (!onSearchClick) {
        throw new Error("Search handler not configured.");
      }

      await onSearchClick(trimmedQuery, "journalist");
      setRumorQuery("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to reach the report service.";
      console.error("Rumor submission failed:", message);
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-[#FDFBF7] dark:bg-[#1F2937] font-body text-[#374151] dark:text-[#F3F4F6] transition-colors duration-300"
      style={{ minHeight: "max(884px, 100dvh)" }}
    >
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="text-center py-6 border-b-2 border-double border-[#374151] dark:border-[#F3F4F6]">
          <h1 className="font-display text-5xl md:text-7xl font-bold">The Demyst Times</h1>
          <p className="text-sm mt-2">Monday, July 22, 2024 - Brighton, UK</p>
        </header>

        <main className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="col-span-1 border-r border-[#E5E7EB] dark:border-[#4B5563] pr-4 space-y-6">
              <div>
                <h3 className="font-display text-lg font-semibold mb-2">U.S.</h3>
                <ul className="space-y-1 text-sm">
                  <li><a className="hover:underline" href="#">U.S. - International</a></li>
                  <li><a className="hover:underline" href="#">Espa&ntilde;ol</a></li>
                  <li><a className="hover:underline" href="#">Japanese</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold mb-2">ARTICLE DESK</h3>
                <ul className="space-y-1 text-sm">
                  <li><a className="hover:underline" href="#">Front Section</a></li>
                </ul>
              </div>

              <div className="space-y-1 text-sm">
                <a className="hover:underline block" href="#">@TheDemystTimes</a>
                <a className="hover:underline block" href="#">Subscribe</a>
              </div>

              <div className="mt-10 pt-6 border-t border-[#E5E7EB] dark:border-[#4B5563]">
                <div className="text-center">
                  <span className="font-display text-3xl font-semibold tracking-[0.4em] uppercase text-gray-500 dark:text-gray-400">
                    NO. 01
                  </span>
                </div>
                <div className="mt-6 space-y-6 text-sm">
                  <article>
                    <h4 className="font-display text-lg font-semibold text-[#1F2937] dark:text-gray-100">Story told by the Church Beadle</h4>
                    <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                      That in this vault of skulls, a new light of God's grace has risen for the military officer, who was so deeply touched seeing the bones of mortals.
                    </p>
                  </article>
                  <article>
                    <h4 className="font-display text-lg font-semibold text-[#1F2937] dark:text-gray-100">The last day before Christmas</h4>
                    <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                      Christmas preparations were going at full blast. One still had to send greeting cards with scenery in the snow to bring light to gloomy hearts.
                    </p>
                  </article>
                  <article>
                    <h4 className="font-display text-lg font-semibold text-[#1F2937] dark:text-gray-100">Noise and wonder at the end of Kiev</h4>
                    <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                      The noise of the street did not reach up to the tenth floor, where the engineer lived, but terror will visit the city to come.
                    </p>
                  </article>
                </div>
              </div>
            </aside>

            <div className="col-span-1 md:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section>
                    <h2 className="font-display text-4xl font-bold mb-4">Your principles are living things</h2>
                    <p className="text-lg mb-6">
                      Your principles are the ideas, concepts, and beliefs that you hold as important. Except for the times when we forget, our principles guide our actions.
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <span className="text-xl font-bold font-display">"</span>
                        <div>
                          <p>
                            Humility: a simple thing is often the most profound. A truly happy person is one who can enjoy the scenery on a detour. There is a calmness to a life lived in gratitude, a quiet joy.
                          </p>
                          <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Marcus Aurelius</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <span className="text-xl font-bold font-display">"</span>
                        <div>
                          <p>
                            Love of knowledge and truth are the most sublime values in the face of a plural world for the purpose of practicing friendship.
                          </p>
                          <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Michel Foucault</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-8 text-xs text-gray-500 dark:text-gray-400">
                      <div>
                        <p className="font-bold">#1 The crisis we find ourselves in has been decades in the making.</p>
                        <p className="mt-1">Kierkegaard</p>
                      </div>
                      <div>
                        <p className="font-bold">#2 It is a great act of rebellion in this world to be happy.</p>
                        <p className="mt-1">Albert Camus</p>
                      </div>
                      <div>
                        <p className="font-bold">#3 A friend is someone who knows all about you and still loves you.</p>
                        <p className="mt-1">Elbert Hubbard</p>
                      </div>
                      <div>
                        <p className="font-bold">#4 How wild it was, to let it be.</p>
                        <p className="mt-1">Cheryl Strayed</p>
                      </div>
                    </div>
                  </section>

                  <div className="border-t border-[#D1D5DB] dark:border-[#374151] pt-10">
                    <div className="border border-[#E5E7EB] dark:border-[#4B5563] bg-[#FAFAF5] dark:bg-[#111827] px-8 py-10 text-center">
                      <h3 className="font-display text-2xl font-semibold tracking-wide text-gray-600 dark:text-gray-200">For Those Who Seek to Understand</h3>
                      <form className="mt-6 mx-auto flex max-w-xl flex-col items-center gap-3 sm:flex-row" onSubmit={handleRumorSubmit}>
                        <div className="relative w-full sm:flex-1">
                          <input
                            aria-label="Rumor submission"
                            className="w-full border border-[#D1D5DB] dark:border-[#374151] bg-white/80 dark:bg-[#1F2937] px-4 py-2 text-center text-base text-[#1F2937] dark:text-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#374151]/40"
                            placeholder="Any rumors?.. Type it out here."
                            style={{ fontFamily: '"Instrument Serif", serif', lineHeight: "21px" }}
                            value={rumorQuery}
                            onChange={(event) => setRumorQuery(event.target.value)}
                            type="text"
                            disabled={isSubmitting}
                          />
                        </div>
                        <button
                          className="w-full sm:w-auto border border-[#374151] bg-[#1F2937] px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-70 dark:border-[#F3F4F6] dark:bg-[#F3F4F6] dark:text-[#1F2937] dark:hover:bg-[#E5E7EB]"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </form>
                      {submissionError && (
                        <p className="mt-3 text-sm text-rose-600 dark:text-rose-400" role="alert">
                          {submissionError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <section>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-display text-xl font-bold">Featured Articles</h3>
                      <a className="text-sm flex items-center hover:underline" href="#">
                        See All <span className="material-icons text-base ml-1">arrow_forward</span>
                      </a>
                    </div>

                    <div className="space-y-6">
                      <article>
                        <img
                          alt="A classical painting of a winter scene with many figures"
                          className="w-full h-auto mb-2"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAthsT1jkU6RcfzoF_NsjMnOjUgZs9RuKRzsaN9R9NWiBI0PkFo2EXQukti8othcyZ_3k7b74ms4MzOifTE76W9bnPylJ83N0P2syJGCgdsqANt2mquO-2cDb8S5LXacMapEQWHhNfki3-aVgZqOE3OEPRTirAWOxvgeecxWPq2bdIYb8gAUdyQWWafh1Jj3qeixSr0aqGf5zz8s31Y5sZjbUmQt9u7tSxS2dhdzDM2XWfwi36nyKmjsDt6xPdy-7Fzqb3HaYzJjxWD"
                        />
                        <h4 className="font-display text-lg font-semibold">National Gallery to reopen exhibition on Pieter Brueghel</h4>
                        <p className="text-sm mt-1 leading-relaxed">
                          The exhibition will feature more than 10 paintings on display for the first time, some of which have never been seen in public before, including "Hunters in the Snow" and "The Peasant Wedding".
                        </p>
                        <a className="text-sm flex items-center hover:underline mt-2" href="#">
                          See More <span className="material-icons text-base ml-1">arrow_forward</span>
                        </a>
                      </article>

                      <article>
                        <img
                          alt="A classical painting depicting a dramatic scene with figures in elaborate dress"
                          className="w-full h-auto mb-2"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG96rVmnb3uItKED21phb7MPLbV5YhV4j8App29MDaG96zA-RXuOsQasQK8vrlBHTc0zh0yB9hByx43nH2KRifjCbrm8sEQP_c4AtlWmx_LG3N-0GwytrI7U-f0S9D9cAszIuxUitXY1Svx-VLbCUA8cWiKV5r7x3P4tkKAXdHpvmcOEtMx3MX9y-BPEAMnBAhQC3uIeXxWiCF5jXt9UTYBWJmO8n0Ne9aqPCD_0Yf-Mmd7qrfnpg0g0zcFQOoM-FpC9xulp6S9Y2i"
                        />
                        <h4 className="font-display text-lg font-semibold">Five key Renaissance Paintings</h4>
                      </article>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-8 border-t border-[#E5E7EB] dark:border-[#4B5563] pt-4 text-xs text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap">
          <p>
            The Demyst Times - Home Page - Arts - National Portrait Gallery - News - The Last Day at the Races - NPG's Exhibition Features - National Portrait Gallery
          </p>
        </footer>
      </div>
    </div>
  );
};
