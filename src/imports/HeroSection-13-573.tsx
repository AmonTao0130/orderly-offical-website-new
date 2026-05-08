function FeatureIcon() {
  return (
    <div className="bg-[#6700ce] content-stretch flex flex-col items-center justify-center px-[24px] py-[5px] relative rounded-[40px] shrink-0 size-[80px]" data-name="Feature Icon">
      <p className="font-['Atyp_BL:Semibold',sans-serif] h-[65px] leading-[1.2] not-italic relative shrink-0 text-[50px] text-center text-white w-[27px] whitespace-pre-wrap">1</p>
    </div>
  );
}

function FeatureItem() {
  return (
    <div className="content-stretch flex flex-col gap-[39px] h-[298px] items-center relative shrink-0 w-[313px]" data-name="Feature Item">
      <FeatureIcon />
      <p className="font-['Atyp_BL:Display_-_Bold',sans-serif] font-bold leading-[1.2] min-w-full relative shrink-0 text-[48px] text-center text-white w-[min-content] whitespace-pre-wrap" style={{ fontVariationSettings: "'ital' 0, 'opsz' 72" }}>
        Connect
      </p>
      <p className="font-['Atyp_BL:Display_-_Medium',sans-serif] font-[507] h-[67.576px] leading-[1.3] relative shrink-0 text-[24px] text-center text-white tracking-[-0.3125px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'ital' 0, 'opsz' 72", fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}>
        Plug into Orderly’s shared orderbook via SDK or white-label (OrderlyOne).
      </p>
    </div>
  );
}

function FeatureIcon1() {
  return (
    <div className="bg-[#6700ce] content-stretch flex flex-col items-center justify-center px-[24px] py-[5px] relative rounded-[40px] shrink-0 size-[80px]" data-name="Feature Icon">
      <p className="font-['Atyp_BL:Semibold',sans-serif] h-[67px] leading-[1.2] not-italic relative shrink-0 text-[50px] text-center text-white w-[32px] whitespace-pre-wrap">2</p>
    </div>
  );
}

function FeatureItem1() {
  return (
    <div className="content-stretch flex flex-col gap-[39px] items-center relative shrink-0 w-[312.726px]" data-name="Feature Item">
      <FeatureIcon1 />
      <p className="font-['Atyp_BL:Display_-_Bold',sans-serif] font-bold leading-[1.2] min-w-full relative shrink-0 text-[48px] text-center text-white w-[min-content] whitespace-pre-wrap" style={{ fontVariationSettings: "'ital' 0, 'opsz' 72" }}>
        Customize
      </p>
      <p className="font-['Atyp_BL:Display_-_Medium',sans-serif] font-[507] h-[86px] leading-[1.3] relative shrink-0 text-[24px] text-center text-white tracking-[-0.3125px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'ital' 0, 'opsz' 72", fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}>
        Brand it, set fees, choose your chain. Your exchange, your rules.
      </p>
    </div>
  );
}

function FeatureIcon2() {
  return (
    <div className="bg-[#6700ce] content-stretch flex flex-col items-center justify-center px-[24px] py-[5px] relative rounded-[40px] shrink-0 size-[80px]" data-name="Feature Icon">
      <p className="font-['Atyp_BL:Semibold',sans-serif] h-[65px] leading-[1.2] not-italic relative shrink-0 text-[50px] text-center text-white w-[29px] whitespace-pre-wrap">3</p>
    </div>
  );
}

function FeatureItem2() {
  return (
    <div className="content-stretch flex flex-col gap-[39px] items-center relative shrink-0 w-[312.726px]" data-name="Feature Item">
      <FeatureIcon2 />
      <p className="font-['Atyp_BL:Display_-_Bold',sans-serif] font-bold leading-[1.2] min-w-full relative shrink-0 text-[48px] text-center text-white w-[min-content] whitespace-pre-wrap" style={{ fontVariationSettings: "'ital' 0, 'opsz' 72" }}>
        Earn
      </p>
      <p className="font-['Atyp_BL:Display_-_Medium',sans-serif] font-[507] h-[86px] leading-[1.3] relative shrink-0 text-[24px] text-center text-white tracking-[-0.3125px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'ital' 0, 'opsz' 72", fontFeatureSettings: "'ss02', 'ss03', 'ss05', 'ss06'" }}>
        {`Every trade on your frontend = revenue to you. `}
        <br aria-hidden="true" />
        Day one.
      </p>
    </div>
  );
}

function FeaturesList() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Features List">
      <FeatureItem />
      <FeatureItem1 />
      <FeatureItem2 />
    </div>
  );
}

function FeaturesContainer() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[1302.014px]" data-name="Features Container">
      <FeaturesList />
    </div>
  );
}

function FeaturesSection() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Features Section">
      <div className="col-1 flex h-[1.805px] items-center justify-center ml-[143.01px] mt-[40.02px] relative row-1 w-[1016.028px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[0.1deg]">
          <div className="h-0 relative w-[1016.03px]">
            <div className="absolute inset-[-2px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1016.03 2">
                <line id="Line 11" stroke="var(--stroke-0, #6700CE)" strokeDasharray="5 5" strokeWidth="2" x2="1016.03" y1="1" y2="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <FeaturesContainer />
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="content-stretch flex flex-col gap-[56px] items-start relative size-full" data-name="Hero Section">
      <p className="font-['Atyp_BL:Bold',sans-serif] h-[70px] leading-[1.1] not-italic relative shrink-0 text-[56px] text-center text-white w-full whitespace-pre-wrap" style={{ fontFeatureSettings: "'ss03', 'ss02', 'ss05', 'ss06'" }}>
        From zero to live DEX in one integration
      </p>
      <FeaturesSection />
    </div>
  );
}