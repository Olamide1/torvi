import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#F7F6F3] pt-20 pb-24">
      <div className="max-w-page mx-auto px-6 sm:px-10">
        {/* Top label */}
        <p className="text-[11px] font-semibold text-[#78716C] uppercase tracking-[0.1em] mb-8">
          TORVI · GUIDED BUILD SYSTEM
        </p>

        <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-start">
          {/* Left */}
          <div>
            <h1
              className="font-semibold text-[#1C1917] leading-[0.97] tracking-[-0.04em] mb-7"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              Ship the tool<br />
              you&apos;ve been<br />
              putting off.
            </h1>

            <p className="text-[1.0625rem] text-[#78716C] leading-[1.75] max-w-lg mb-8">
              A guided build system for senior professionals. Buy and start immediately. The app guides your work week by week. Office hours unblock you. One shipped tool at the end.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-10">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center h-11 px-6 text-sm font-medium rounded bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors tracking-[-0.01em] min-h-[44px]"
              >
                Get your free role kit
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 h-11 px-1 text-sm font-medium text-[#78716C] hover:text-[#1C1917] transition-colors min-h-[44px]"
              >
                How it works
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Open enrolment strip */}
            <p className="text-sm text-[#78716C]">
              Open enrolment &middot; Start immediately &middot; Weekly guided runs &middot; &euro;200 founding rate
            </p>
          </div>

          {/* Right: SVG architecture diagram */}
          <div className="hidden lg:block pt-2">
            <BuildDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildDiagram() {
  const boxW = 200;
  const boxH = 44;
  const startX = 40;
  const centerX = startX + boxW / 2;
  const gapY = 28;
  const rowH = boxH + gapY;

  const y0 = 20;  // Your problem
  const y1 = y0 + rowH; // Week 0
  const y2 = y1 + rowH; // Week 1
  const y3 = y2 + rowH; // Week 2
  const y4 = y3 + rowH; // Week 3
  const y5 = y4 + rowH; // Week 4
  const y6 = y5 + rowH; // Output

  const totalH = y6 + boxH + 20;

  return (
    <svg
      viewBox={`0 0 ${startX * 2 + boxW} ${totalH}`}
      width={startX * 2 + boxW}
      height={totalH}
      aria-label="5-week build path diagram"
    >
      {/* Connecting lines */}
      <line x1={centerX} y1={y0 + boxH} x2={centerX} y2={y1} stroke="#D6D3D1" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={centerX} y1={y1 + boxH} x2={centerX} y2={y2} stroke="#D6D3D1" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={centerX} y1={y2 + boxH} x2={centerX} y2={y3} stroke="#D6D3D1" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={centerX} y1={y3 + boxH} x2={centerX} y2={y4} stroke="#D6D3D1" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={centerX} y1={y4 + boxH} x2={centerX} y2={y5} stroke="#D6D3D1" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={centerX} y1={y5 + boxH} x2={centerX} y2={y6} stroke="#D6D3D1" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Arrowheads */}
      {[y1, y2, y3, y4, y5, y6].map((y) => (
        <polygon key={y} points={`${centerX - 4},${y - 6} ${centerX + 4},${y - 6} ${centerX},${y}`} fill="#D6D3D1" />
      ))}

      {/* Box: Your problem */}
      <rect x={startX} y={y0} width={boxW} height={boxH} rx="3" fill="white" stroke="#E7E5E4" strokeWidth="1" />
      <text x={startX + 12} y={y0 + 16} fontSize="9.5" fontWeight="600" fill="#78716C" fontFamily="system-ui" letterSpacing="0.08em">YOUR PROBLEM</text>
      <text x={startX + 12} y={y0 + 31} fontSize="11" fill="#78716C" fontFamily="system-ui">One work problem worth solving</text>

      {/* Week 0 */}
      <rect x={startX} y={y1} width={boxW} height={boxH} rx="3" fill="white" stroke="#E7E5E4" strokeWidth="1" />
      <text x={startX + 12} y={y1 + 15} fontSize="9" fontWeight="600" fill="#78716C" fontFamily="system-ui" letterSpacing="0.06em">WEEK 0</text>
      <text x={startX + 12} y={y1 + 30} fontSize="11.5" fill="#1C1917" fontFamily="system-ui">Write your tool brief</text>

      {/* Week 1 — active (accent) */}
      <rect x={startX} y={y2} width={boxW} height={boxH} rx="3" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="1.5" />
      <rect x={startX} y={y2} width="3" height={boxH} rx="1.5" fill="#1D4ED8" />
      <text x={startX + 14} y={y2 + 15} fontSize="9" fontWeight="600" fill="#1D4ED8" fontFamily="system-ui" letterSpacing="0.06em">WEEK 1</text>
      <text x={startX + 14} y={y2 + 30} fontSize="11.5" fontWeight="600" fill="#1C1917" fontFamily="system-ui">Draft: working prototype</text>

      {/* Week 2 */}
      <rect x={startX} y={y3} width={boxW} height={boxH} rx="3" fill="white" stroke="#E7E5E4" strokeWidth="1" />
      <text x={startX + 12} y={y3 + 15} fontSize="9" fontWeight="600" fill="#78716C" fontFamily="system-ui" letterSpacing="0.06em">WEEK 2</text>
      <text x={startX + 12} y={y3 + 30} fontSize="11.5" fill="#1C1917" fontFamily="system-ui">Make it usable</text>

      {/* Week 3 */}
      <rect x={startX} y={y4} width={boxW} height={boxH} rx="3" fill="white" stroke="#E7E5E4" strokeWidth="1" />
      <text x={startX + 12} y={y4 + 15} fontSize="9" fontWeight="600" fill="#78716C" fontFamily="system-ui" letterSpacing="0.06em">WEEK 3</text>
      <text x={startX + 12} y={y4 + 30} fontSize="11.5" fill="#1C1917" fontFamily="system-ui">Review and polish</text>

      {/* Week 4 */}
      <rect x={startX} y={y5} width={boxW} height={boxH} rx="3" fill="white" stroke="#E7E5E4" strokeWidth="1" />
      <text x={startX + 12} y={y5 + 15} fontSize="9" fontWeight="600" fill="#78716C" fontFamily="system-ui" letterSpacing="0.06em">WEEK 4</text>
      <text x={startX + 12} y={y5 + 30} fontSize="11.5" fill="#1C1917" fontFamily="system-ui">Ship it</text>

      {/* Output box */}
      <rect x={startX} y={y6} width={boxW} height={boxH} rx="3" fill="#1C1917" stroke="#1C1917" strokeWidth="1" />
      <text x={startX + 12} y={y6 + 16} fontSize="9.5" fontWeight="600" fill="#78716C" fontFamily="system-ui" letterSpacing="0.08em">OUTPUT</text>
      <text x={startX + 12} y={y6 + 31} fontSize="11" fontWeight="600" fill="white" fontFamily="system-ui">Shipped tool + certificate</text>
    </svg>
  );
}
