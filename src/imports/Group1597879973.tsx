import svgPaths from "./svg-m6f023dt0t";

function QuickStartClient() {
  return (
    <div className="bg-[#6700ce] content-stretch flex h-[47.305px] items-center justify-center px-[17px] py-[8px] relative rounded-[8px] shrink-0" data-name="Quick Start Client">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Interactive</p>
    </div>
  );
}

function QuickStartClients() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[31px] items-center min-h-px min-w-px overflow-clip relative" data-name="Quick Start Clients">
      <QuickStartClient />
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Claude</p>
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Cursor</p>
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">VScode</p>
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Codex</p>
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Opencode</p>
    </div>
  );
}

function ArrowLeftCircle() {
  return (
    <div className="h-[42.667px] relative w-[44.667px]" data-name="Arrow left-circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6667 42.6667">
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.p10be0e00} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p16992700} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p180d8980} stroke="var(--stroke-0, #3F0086)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
          <path d={svgPaths.p344fa9e0} id="Icon_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <ArrowLeftCircle />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#14151a] h-[98.461px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[20px] relative size-full">
          <QuickStartClients />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function QuickStartCommand() {
  return (
    <div className="content-stretch flex flex-col font-['DM_Mono:Regular',sans-serif] gap-[20px] items-start leading-[normal] not-italic relative shrink-0 text-[16px] w-[240px]" data-name="Quick Start Command">
      <p className="relative shrink-0 text-[#5e6673] w-full">Supported clients: claude, cursor, vscode, codex, opencode</p>
      <p className="relative shrink-0 text-white w-full">$ npx @orderly.network/mcp-server init</p>
    </div>
  );
}

function ContentCopy() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.594px]" data-name="content_copy">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5945 24">
        <g id="content_copy">
          <mask height="24" id="mask0_78_972" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="23.5945" />
          </mask>
          <g mask="url(#mask0_78_972)">
            <path d={svgPaths.p3775a80} fill="var(--fill-0, white)" id="content_copy_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function QuickStartIconContainer() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex h-[40px] items-start justify-end p-[8px] relative rounded-[8px] shrink-0 w-[39.324px]" data-name="Quick Start Icon Container">
      <ContentCopy />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <QuickStartIconContainer />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <QuickStartCommand />
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#1e2026] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[30px] relative w-full">
        <Frame />
      </div>
    </div>
  );
}

function QuickStartContent() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Quick Start Content">
      <Frame5 />
      <Frame3 />
    </div>
  );
}

function QuickStartHeader1() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[333px]" data-name="Quick Start Header">
      <QuickStartContent />
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <QuickStartHeader1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group1 />
    </div>
  );
}

function QuickStartHeader() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[333px]" data-name="Quick Start Header">
      <Group2 />
    </div>
  );
}

function QuickStartClient1() {
  return (
    <div className="bg-[#6700ce] content-stretch flex h-[47.305px] items-center justify-center px-[17px] py-[8px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Quick Start Client">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Claude</p>
    </div>
  );
}

function QuickStartClients1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[30px] items-center min-h-px min-w-px overflow-clip relative" data-name="Quick Start Clients">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">One-Liner</p>
      <QuickStartClient1 />
    </div>
  );
}

function ArrowLeftCircle1() {
  return (
    <div className="h-[42.667px] relative w-[44.667px]" data-name="Arrow left-circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6667 42.6667">
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.p10be0e00} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p16992700} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p180d8980} stroke="var(--stroke-0, #3F0086)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
          <path d={svgPaths.p344fa9e0} id="Icon_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <ArrowLeftCircle1 />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#14151a] h-[98.461px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[20px] relative size-full">
          <QuickStartClients1 />
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function QuickStartCommand1() {
  return (
    <div className="content-stretch flex flex-col h-[146px] items-start relative shrink-0 w-[240px]" data-name="Quick Start Command">
      <div className="flex flex-col font-['DM_Mono:Regular',sans-serif] h-[146px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[normal]">$ npx @orderly.network/mcp-server init --client claude</p>
      </div>
    </div>
  );
}

function ContentCopy1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.594px]" data-name="content_copy">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5945 24">
        <g id="content_copy">
          <mask height="24" id="mask0_78_972" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="23.5945" />
          </mask>
          <g mask="url(#mask0_78_972)">
            <path d={svgPaths.p3775a80} fill="var(--fill-0, white)" id="content_copy_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function QuickStartIconContainer1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex h-[40px] items-start justify-end p-[8px] relative rounded-[8px] shrink-0 w-[39.324px]" data-name="Quick Start Icon Container">
      <ContentCopy1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <QuickStartIconContainer1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <QuickStartCommand1 />
      <Frame9 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#1e2026] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[30px] relative w-full">
        <Frame1 />
      </div>
    </div>
  );
}

function QuickStartContent1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Quick Start Content">
      <Frame7 />
      <Frame4 />
    </div>
  );
}

function QuickStartHeader3() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[333px]" data-name="Quick Start Header">
      <QuickStartContent1 />
    </div>
  );
}

function Group6() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <QuickStartHeader3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group6 />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group5 />
    </div>
  );
}

function QuickStartHeader2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[310.56px] w-[333px]" data-name="Quick Start Header">
      <Group4 />
    </div>
  );
}

function QuickStartClient2() {
  return (
    <div className="bg-[#6700ce] content-stretch flex h-[47.305px] items-center justify-center px-[17px] py-[8px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Quick Start Client">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Cursor</p>
    </div>
  );
}

function QuickStartClients2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[30px] items-center min-h-px min-w-px overflow-clip relative" data-name="Quick Start Clients">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">One-Liner</p>
      <QuickStartClient2 />
    </div>
  );
}

function ArrowLeftCircle2() {
  return (
    <div className="h-[42.667px] relative w-[44.667px]" data-name="Arrow left-circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6667 42.6667">
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.p10be0e00} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p16992700} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p180d8980} stroke="var(--stroke-0, #3F0086)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
          <path d={svgPaths.p344fa9e0} id="Icon_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <ArrowLeftCircle2 />
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#14151a] h-[98.461px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[20px] relative size-full">
          <QuickStartClients2 />
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function QuickStartCommand2() {
  return (
    <div className="content-stretch flex flex-col h-[146px] items-start relative shrink-0 w-[240px]" data-name="Quick Start Command">
      <div className="flex flex-col font-['DM_Mono:Regular',sans-serif] h-[146px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[normal]">{`$ npx @orderly.network/mcp-server init --client cursor `}</p>
      </div>
    </div>
  );
}

function ContentCopy2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.594px]" data-name="content_copy">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5945 24">
        <g id="content_copy">
          <mask height="24" id="mask0_78_972" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="23.5945" />
          </mask>
          <g mask="url(#mask0_78_972)">
            <path d={svgPaths.p3775a80} fill="var(--fill-0, white)" id="content_copy_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function QuickStartIconContainer2() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex h-[40px] items-start justify-end p-[8px] relative rounded-[8px] shrink-0 w-[39.324px]" data-name="Quick Start Icon Container">
      <ContentCopy2 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <QuickStartIconContainer2 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <QuickStartCommand2 />
      <Frame14 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#1e2026] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[30px] relative w-full">
        <Frame13 />
      </div>
    </div>
  );
}

function QuickStartContent2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Quick Start Content">
      <Frame10 />
      <Frame12 />
    </div>
  );
}

function QuickStartHeader5() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[333px]" data-name="Quick Start Header">
      <QuickStartContent2 />
    </div>
  );
}

function Group9() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <QuickStartHeader5 />
    </div>
  );
}

function Group8() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group9 />
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group8 />
    </div>
  );
}

function QuickStartHeader4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[642.76px] w-[333px]" data-name="Quick Start Header">
      <Group7 />
    </div>
  );
}

function QuickStartClient3() {
  return (
    <div className="bg-[#6700ce] content-stretch flex h-[47.305px] items-center justify-center px-[17px] py-[8px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Quick Start Client">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">VScode</p>
    </div>
  );
}

function QuickStartClients3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[30px] items-center min-h-px min-w-px overflow-clip relative" data-name="Quick Start Clients">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">One-Liner</p>
      <QuickStartClient3 />
    </div>
  );
}

function ArrowLeftCircle3() {
  return (
    <div className="h-[42.667px] relative w-[44.667px]" data-name="Arrow left-circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6667 42.6667">
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.p10be0e00} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p16992700} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p180d8980} stroke="var(--stroke-0, #3F0086)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
          <path d={svgPaths.p344fa9e0} id="Icon_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <ArrowLeftCircle3 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#14151a] h-[98.461px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[20px] relative size-full">
          <QuickStartClients3 />
          <Frame16 />
        </div>
      </div>
    </div>
  );
}

function QuickStartCommand3() {
  return (
    <div className="content-stretch flex flex-col h-[146px] items-start relative shrink-0 w-[240px]" data-name="Quick Start Command">
      <div className="flex flex-col font-['DM_Mono:Regular',sans-serif] h-[146px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[normal]">$ npx @orderly.network/mcp-server init --client vscode</p>
      </div>
    </div>
  );
}

function ContentCopy3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.594px]" data-name="content_copy">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5945 24">
        <g id="content_copy">
          <mask height="24" id="mask0_78_972" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="23.5945" />
          </mask>
          <g mask="url(#mask0_78_972)">
            <path d={svgPaths.p3775a80} fill="var(--fill-0, white)" id="content_copy_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function QuickStartIconContainer3() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex h-[40px] items-start justify-end p-[8px] relative rounded-[8px] shrink-0 w-[39.324px]" data-name="Quick Start Icon Container">
      <ContentCopy3 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <QuickStartIconContainer3 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <QuickStartCommand3 />
      <Frame19 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="bg-[#1e2026] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[30px] relative w-full">
        <Frame18 />
      </div>
    </div>
  );
}

function QuickStartContent3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Quick Start Content">
      <Frame15 />
      <Frame17 />
    </div>
  );
}

function QuickStartHeader7() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[333px]" data-name="Quick Start Header">
      <QuickStartContent3 />
    </div>
  );
}

function Group12() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <QuickStartHeader7 />
    </div>
  );
}

function Group11() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group12 />
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group11 />
    </div>
  );
}

function QuickStartHeader6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[962.63px] w-[333px]" data-name="Quick Start Header">
      <Group10 />
    </div>
  );
}

function QuickStartClient4() {
  return (
    <div className="bg-[#6700ce] content-stretch flex h-[47.305px] items-center justify-center px-[17px] py-[8px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Quick Start Client">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Codex</p>
    </div>
  );
}

function QuickStartClients4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[30px] items-center min-h-px min-w-px overflow-clip relative" data-name="Quick Start Clients">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">One-Liner</p>
      <QuickStartClient4 />
    </div>
  );
}

function ArrowLeftCircle4() {
  return (
    <div className="h-[42.667px] relative w-[44.667px]" data-name="Arrow left-circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6667 42.6667">
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.p10be0e00} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p16992700} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p180d8980} stroke="var(--stroke-0, #3F0086)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
          <path d={svgPaths.p344fa9e0} id="Icon_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <ArrowLeftCircle4 />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#14151a] h-[98.461px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[20px] relative size-full">
          <QuickStartClients4 />
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function QuickStartCommand4() {
  return (
    <div className="content-stretch flex flex-col h-[146px] items-start relative shrink-0 w-[240px]" data-name="Quick Start Command">
      <div className="flex flex-col font-['DM_Mono:Regular',sans-serif] h-[146px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[normal]">$ npx @orderly.network/mcp-server init --client codex</p>
      </div>
    </div>
  );
}

function ContentCopy4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.594px]" data-name="content_copy">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5945 24">
        <g id="content_copy">
          <mask height="24" id="mask0_78_972" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="23.5945" />
          </mask>
          <g mask="url(#mask0_78_972)">
            <path d={svgPaths.p3775a80} fill="var(--fill-0, white)" id="content_copy_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function QuickStartIconContainer4() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex h-[40px] items-start justify-end p-[8px] relative rounded-[8px] shrink-0 w-[39.324px]" data-name="Quick Start Icon Container">
      <ContentCopy4 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <QuickStartIconContainer4 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <QuickStartCommand4 />
      <Frame24 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#1e2026] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[30px] relative w-full">
        <Frame23 />
      </div>
    </div>
  );
}

function QuickStartContent4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Quick Start Content">
      <Frame20 />
      <Frame22 />
    </div>
  );
}

function QuickStartHeader9() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[333px]" data-name="Quick Start Header">
      <QuickStartContent4 />
    </div>
  );
}

function Group15() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <QuickStartHeader9 />
    </div>
  );
}

function Group14() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group15 />
    </div>
  );
}

function Group13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group14 />
    </div>
  );
}

function QuickStartHeader8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[1282.49px] w-[333px]" data-name="Quick Start Header">
      <Group13 />
    </div>
  );
}

function QuickStartClient5() {
  return (
    <div className="bg-[#6700ce] content-stretch flex h-[47.305px] items-center justify-center px-[17px] py-[8px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Quick Start Client">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Opencode</p>
    </div>
  );
}

function QuickStartClients5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[30px] items-center min-h-px min-w-px overflow-clip relative" data-name="Quick Start Clients">
      <p className="font-['DM_Mono:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">One-Liner</p>
      <QuickStartClient5 />
    </div>
  );
}

function ArrowLeftCircle5() {
  return (
    <div className="h-[42.667px] relative w-[44.667px]" data-name="Arrow left-circle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44.6667 42.6667">
        <g id="Arrow left-circle">
          <g id="Icon">
            <path d={svgPaths.p10be0e00} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p16992700} fill="var(--fill-0, #3F0086)" />
            <path d={svgPaths.p180d8980} stroke="var(--stroke-0, #3F0086)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          </g>
          <path d={svgPaths.p344fa9e0} id="Icon_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <ArrowLeftCircle5 />
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[#14151a] h-[98.461px] relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[20px] relative size-full">
          <QuickStartClients5 />
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function QuickStartCommand5() {
  return (
    <div className="content-stretch flex flex-col h-[146px] items-start relative shrink-0 w-[240px]" data-name="Quick Start Command">
      <div className="flex flex-col font-['DM_Mono:Regular',sans-serif] h-[146px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[normal]">$ npx @orderly.network/mcp-server init --client opencode</p>
      </div>
    </div>
  );
}

function ContentCopy5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[23.594px]" data-name="content_copy">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5945 24">
        <g id="content_copy">
          <mask height="24" id="mask0_78_972" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="23.5945" />
          </mask>
          <g mask="url(#mask0_78_972)">
            <path d={svgPaths.p3775a80} fill="var(--fill-0, white)" id="content_copy_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function QuickStartIconContainer5() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex h-[40px] items-start justify-end p-[8px] relative rounded-[8px] shrink-0 w-[39.324px]" data-name="Quick Start Icon Container">
      <ContentCopy5 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <QuickStartIconContainer5 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <QuickStartCommand5 />
      <Frame29 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[#1e2026] relative rounded-bl-[30px] rounded-br-[30px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[30px] relative w-full">
        <Frame28 />
      </div>
    </div>
  );
}

function QuickStartContent5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Quick Start Content">
      <Frame25 />
      <Frame27 />
    </div>
  );
}

function QuickStartHeader11() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start ml-0 mt-0 relative row-1 w-[333px]" data-name="Quick Start Header">
      <QuickStartContent5 />
    </div>
  );
}

function Group18() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <QuickStartHeader11 />
    </div>
  );
}

function Group17() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <Group18 />
    </div>
  );
}

function Group16() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group17 />
    </div>
  );
}

function QuickStartHeader10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-[1602.36px] w-[333px]" data-name="Quick Start Header">
      <Group16 />
    </div>
  );
}

export default function Group3() {
  return (
    <div className="relative size-full">
      <QuickStartHeader />
      <QuickStartHeader2 />
      <QuickStartHeader4 />
      <QuickStartHeader6 />
      <QuickStartHeader8 />
      <QuickStartHeader10 />
    </div>
  );
}