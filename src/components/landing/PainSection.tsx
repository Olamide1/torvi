export function PainSection() {
  const pains = [
    {
      icon: "⏱",
      headline: "No time for deep study",
      body: "You have 3 hours a week, not 3 months. You need a path that works inside your actual schedule.",
    },
    {
      icon: "🗺",
      headline: "Instructions scattered everywhere",
      body: "Tutorials that start and stop. Docs that assume you already know. Courses you half-finish. None of it adds up to a shipped thing.",
    },
    {
      icon: "📦",
      headline: "Nothing to show at the end",
      body: "You want a working tool you can hand off, not a certificate for watching 40 hours of video.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F7F8FA] border-y border-[#EEF1F4]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#16181D] tracking-tight mb-4">
            You do not need another pile of tutorials
          </h2>
          <p className="text-lg text-[#4A4F59]">
            You need a guided system that tells you what to do next and helps you ship something useful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((pain) => (
            <div key={pain.headline} className="bg-white rounded-xl border border-[#DDE1E7] p-6 space-y-3">
              <div className="text-2xl">{pain.icon}</div>
              <h3 className="font-semibold text-[#16181D] text-base">{pain.headline}</h3>
              <p className="text-sm text-[#4A4F59] leading-relaxed">{pain.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
