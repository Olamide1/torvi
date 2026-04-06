export function TrustStrip() {
  return (
    <div className="border-y border-[#EEF1F4] bg-[#F7F8FA]">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 flex-wrap text-sm text-[#7B8391]">
          <span className="font-medium text-[#4A4F59] text-xs uppercase tracking-widest">Used by people at</span>
          <span className="text-[#DDE1E7]">·</span>
          {["McKinsey", "Shopify", "PwC", "Monzo", "Deliveroo", "Stripe", "Canva"].map((name, i, arr) => (
            <span key={name} className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#4A4F59]">{name}</span>
              {i < arr.length - 1 && <span className="text-[#DDE1E7]">·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
