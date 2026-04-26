/* Bangladeshi dusk — warm amber sunset, paddy fields, river, palm silhouettes */
export default function BangladeshScenic() {
  const stalks = [80,130,185,240,300,360,420,490,560,640,720,800,890,980,1080,1180,1290]

  return (
    <div className="w-full h-full absolute inset-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          {/* Sky: dark forest left → warm amber-orange right */}
          <linearGradient id="sky" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#030b05" />
            <stop offset="30%"  stopColor="#071610" />
            <stop offset="58%"  stopColor="#1c3010" />
            <stop offset="78%"  stopColor="#4a2208" />
            <stop offset="100%" stopColor="#6e2e06" />
          </linearGradient>
          {/* Sky vertical — darken at very top */}
          <linearGradient id="skyTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#010402" stopOpacity="0.55" />
            <stop offset="28%"  stopColor="#010402" stopOpacity="0" />
          </linearGradient>
          {/* Sun radial — upper right corner */}
          <radialGradient id="sun" cx="96%" cy="4%" r="58%">
            <stop offset="0%"   stopColor="#fcc050" stopOpacity="0.92" />
            <stop offset="18%"  stopColor="#e87818" stopOpacity="0.60" />
            <stop offset="42%"  stopColor="#a84008" stopOpacity="0.28" />
            <stop offset="72%"  stopColor="#501c04" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1a0800" stopOpacity="0" />
          </radialGradient>
          {/* Horizon glow — lower right */}
          <radialGradient id="hori" cx="82%" cy="68%" r="52%">
            <stop offset="0%"   stopColor="#f08820" stopOpacity="0.50" />
            <stop offset="38%"  stopColor="#c05010" stopOpacity="0.22" />
            <stop offset="80%"  stopColor="#5a2008" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1a0800" stopOpacity="0" />
          </radialGradient>
          {/* River — teal left, warm amber right */}
          <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#0a2e3e" />
            <stop offset="48%"  stopColor="#103d50" />
            <stop offset="80%"  stopColor="#442810" />
            <stop offset="100%" stopColor="#603415" />
          </linearGradient>
          {/* Hills far */}
          <linearGradient id="hills" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0c2e1c" />
            <stop offset="100%" stopColor="#071a10" />
          </linearGradient>
          {/* Mid field */}
          <linearGradient id="f1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#103e28" />
            <stop offset="100%" stopColor="#082818" />
          </linearGradient>
          {/* Near field */}
          <linearGradient id="f2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#165830" />
            <stop offset="100%" stopColor="#0c3820" />
          </linearGradient>
          {/* Foreground */}
          <linearGradient id="fore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1c7040" />
            <stop offset="100%" stopColor="#104a28" />
          </linearGradient>
          {/* Filters */}
          <filter id="blur12" x="-30%" y="-80%" width="160%" height="280%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="blur4" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="blur2" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* ── Sky base ── */}
        <rect width="1440" height="720" fill="url(#sky)" />
        <rect width="1440" height="720" fill="url(#skyTop)" />
        {/* Sun glow */}
        <rect width="1440" height="720" fill="url(#sun)" />
        {/* Horizon warm bloom */}
        <rect width="1440" height="720" fill="url(#hori)" />

        {/* ── Sun disc (behind hills, upper right) ── */}
        <circle cx="1370" cy="210" r="62" fill="#f5c060" opacity="0.80" filter="url(#blur2)" />
        <circle cx="1370" cy="210" r="46" fill="#fdd888" opacity="0.92" />
        <circle cx="1370" cy="210" r="30" fill="#fff5c0" opacity="0.98" />

        {/* ── Warm cloud wisps in upper-right sky ── */}
        <g opacity="0.22">
          <ellipse cx="1120" cy="75"  rx="190" ry="24" fill="#f09030" filter="url(#blur4)" />
          <ellipse cx="1310" cy="50"  rx="148" ry="17" fill="#f8c050" filter="url(#blur4)" />
          <ellipse cx="990"  cy="118" rx="130" ry="15" fill="#e07818" filter="url(#blur4)" />
          <ellipse cx="1380" cy="138" rx="110" ry="13" fill="#f09030" filter="url(#blur4)" />
        </g>

        {/* ── Stars — upper left only, fade toward right ── */}
        <g>
          <circle cx="62"  cy="25"  r="1.1" fill="#d0ffe0" opacity="0.72" />
          <circle cx="136" cy="50"  r="0.8" fill="#fff"    opacity="0.65" />
          <circle cx="192" cy="18"  r="1.0" fill="#d0ffe0" opacity="0.68" />
          <circle cx="272" cy="40"  r="0.7" fill="#fff"    opacity="0.58" />
          <circle cx="330" cy="12"  r="1.1" fill="#d0ffe0" opacity="0.62" />
          <circle cx="400" cy="48"  r="0.8" fill="#fff"    opacity="0.50" />
          <circle cx="456" cy="24"  r="0.9" fill="#d0ffe0" opacity="0.44" />
          <circle cx="516" cy="62"  r="0.6" fill="#fff"    opacity="0.34" />
          <circle cx="574" cy="18"  r="1.0" fill="#d0ffe0" opacity="0.26" />
          <circle cx="618" cy="42"  r="0.8" fill="#fff"    opacity="0.18" />
          <circle cx="672" cy="32"  r="0.7" fill="#d0ffe0" opacity="0.10" />
          <circle cx="44"  cy="80"  r="0.8" fill="#fff"    opacity="0.65" />
          <circle cx="152" cy="95"  r="0.7" fill="#d0ffe0" opacity="0.60" />
          <circle cx="232" cy="76"  r="0.9" fill="#fff"    opacity="0.55" />
          <circle cx="310" cy="106" r="0.6" fill="#d0ffe0" opacity="0.48" />
          <circle cx="408" cy="86"  r="0.8" fill="#fff"    opacity="0.40" />
          <circle cx="498" cy="110" r="0.7" fill="#d0ffe0" opacity="0.30" />
          <circle cx="582" cy="92"  r="0.9" fill="#fff"    opacity="0.20" />
          <circle cx="174" cy="140" r="0.8" fill="#fff"    opacity="0.48" />
          <circle cx="340" cy="128" r="0.7" fill="#d0ffe0" opacity="0.36" />
          <circle cx="490" cy="146" r="0.8" fill="#fff"    opacity="0.22" />
        </g>

        {/* ── Birds — V shapes flying toward the light ── */}
        <g stroke="#aaddc0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45">
          <path d="M466,158 Q474,150 482,158" /><path d="M486,154 Q494,146 502,154" />
          <path d="M424,174 Q433,165 442,174" />
          <path d="M548,142 Q558,132 568,142" /><path d="M572,146 Q582,136 592,146" />
          <path d="M508,160 Q518,150 528,160" />
          <path d="M614,134 Q624,124 634,134" /><path d="M638,138 Q648,128 658,138" />
        </g>

        {/* ── Distant hills ── */}
        <path
          d="M0,412 C108,388 265,378 428,394 C576,408 676,382 818,380
             C958,378 1076,394 1196,384 C1286,377 1368,388 1440,396
             L1440,720 L0,720 Z"
          fill="url(#hills)"
        />
        {/* Warm rim-light on right side of hills (lit by sun) */}
        <path
          d="M1080,384 C1200,376 1320,386 1440,396 L1440,416 C1316,404 1196,396 1080,404 Z"
          fill="#d06020" opacity="0.18"
        />

        {/* ── River / Haor ── */}
        <path
          d="M0,421 C176,411 368,407 556,416 C696,422 818,430 980,418
             C1138,406 1298,413 1440,421
             L1440,474 C1298,466 1138,458 980,470
             C818,482 696,476 556,468 C368,458 176,464 0,474 Z"
          fill="url(#river)"
        />
        {/* Sun reflection on water — bright streak on right */}
        <path
          d="M1080,432 C1180,424 1310,428 1440,437 L1440,458 C1310,449 1180,445 1080,453 Z"
          fill="#f09030" opacity="0.28" filter="url(#blur4)"
        />
        {/* Cool shimmer on left */}
        <g stroke="#5dd4a0" strokeWidth="0.9" fill="none" opacity="0.12">
          <path d="M240,436 Q360,431 480,436" />
          <path d="M580,443 Q700,438 820,443" />
        </g>
        {/* Warm shimmer on right */}
        <g stroke="#f0a040" strokeWidth="0.9" fill="none" opacity="0.20">
          <path d="M1100,438 Q1200,433 1310,438" />
          <path d="M1140,449 Q1250,444 1360,449" />
        </g>

        {/* Mist ribbons over water */}
        <ellipse cx="330"  cy="450" rx="310" ry="20" fill="#1a5c35" opacity="0.14" filter="url(#blur12)" />
        <ellipse cx="1060" cy="444" rx="250" ry="16" fill="#7a3010" opacity="0.13" filter="url(#blur12)" />

        {/* ── Boats (Nouka) ── */}
        <g transform="translate(528,443)">
          <path d="M-50,0 Q0,-21 50,0 Q42,12 -42,12 Z" fill="#020d07" />
          <line x1="0" y1="-1" x2="0" y2="-60" stroke="#031008" strokeWidth="2.5" />
          <path d="M0,-58 L-32,-23 L0,-6 Z" fill="#062a16" opacity="0.88" />
          <path d="M0,-58 L 32,-23 L0,-6 Z" fill="#042010" opacity="0.78" />
        </g>
        <g transform="translate(892,438)" opacity="0.62">
          <path d="M-32,0 Q0,-14 32,0 Q26,8 -26,8 Z" fill="#020d07" />
          <line x1="0" y1="-1" x2="0" y2="-37" stroke="#031008" strokeWidth="2" />
          <path d="M0,-35 L-19,-13 L0,-4 Z" fill="#062a16" opacity="0.80" />
        </g>
        <g transform="translate(1236,430)" opacity="0.42">
          <path d="M-21,0 Q0,-9 21,0 Q17,6 -17,6 Z" fill="#1a0a04" />
          <line x1="0" y1="-1" x2="0" y2="-27" stroke="#1a0a04" strokeWidth="1.5" />
        </g>

        {/* ── Mid paddy fields ── */}
        <path
          d="M0,464 C198,452 418,447 620,456 C800,463 950,470 1140,458
             C1278,450 1378,455 1440,463
             L1440,720 L0,720 Z"
          fill="url(#f1)"
        />

        {/* ── Near paddy fields ── */}
        <path
          d="M0,525 C248,510 498,505 718,515 C902,523 1080,515 1280,523
             C1358,528 1418,525 1440,525
             L1440,720 L0,720 Z"
          fill="url(#f2)"
        />
        {/* Rice stalk rows */}
        <g stroke="#3fa066" strokeWidth="0.9" opacity="0.11">
          {stalks.map(x => <line key={x} x1={x} y1="537" x2={x} y2="578" />)}
        </g>
        {/* Warm sun-lit tops on right side of field */}
        <path
          d="M880,525 C1040,515 1200,517 1440,525 L1440,542 C1200,534 1040,532 880,542 Z"
          fill="#c04808" opacity="0.10"
        />

        {/* ── Foreground strip ── */}
        <path
          d="M0,606 C298,591 596,587 898,595 C1098,601 1298,605 1440,606
             L1440,720 L0,720 Z"
          fill="url(#fore)"
        />

        {/* ── Palm / coconut trees — right cluster, silhouetted against warm sky ── */}
        {/* Tree 1 — tallest */}
        <g transform="translate(1288,466)">
          <path d="M0,0 Q-13,-70 -6,-140 Q0,-170 6,-198"
            stroke="#020b04" strokeWidth="13" fill="none" strokeLinecap="round" />
          <path d="M6,-196 Q50,-183 96,-172" stroke="#071c0e" strokeWidth="7"   fill="none" strokeLinecap="round" opacity="0.94" />
          <path d="M6,-196 Q25,-172 38,-151" stroke="#0a2a17" strokeWidth="6"   fill="none" strokeLinecap="round" opacity="0.90" />
          <path d="M6,-196 Q-15,-168 -52,-160" stroke="#071c0e" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.94" />
          <path d="M6,-196 Q-38,-178 -76,-170" stroke="#0a2a17" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.87" />
          <path d="M6,-196 Q22,-215 32,-235" stroke="#071c0e" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.82" />
          <path d="M6,-196 Q-9,-216 -20,-237" stroke="#0a2a17" strokeWidth="5"  fill="none" strokeLinecap="round" opacity="0.77" />
          <path d="M6,-196 Q58,-204 98,-220" stroke="#071c0e" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.72" />
        </g>
        {/* Tree 2 */}
        <g transform="translate(1192,484)">
          <path d="M0,0 Q4,-46 2,-92 Q0,-115 -2,-138"
            stroke="#020b04" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M-2,-136 Q36,-125 70,-120" stroke="#071c0e" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.90" />
          <path d="M-2,-136 Q-32,-123 -64,-117" stroke="#0a2a17" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.90" />
          <path d="M-2,-136 Q11,-153 20,-171" stroke="#071c0e" strokeWidth="5"   fill="none" strokeLinecap="round" opacity="0.82" />
          <path d="M-2,-136 Q-15,-155 -24,-174" stroke="#0a2a17" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.78" />
          <path d="M-2,-136 Q42,-144 74,-159" stroke="#071c0e" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.72" />
          <path d="M-2,-136 Q-42,-146 -76,-162" stroke="#0a2a17" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.72" />
        </g>
        {/* Tree 3 — partially clipped at right edge */}
        <g transform="translate(1406,455)">
          <path d="M0,0 Q-7,-56 -3,-114 Q0,-148 2,-174"
            stroke="#020b04" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M2,-172 Q40,-159 78,-153" stroke="#071c0e" strokeWidth="6"   fill="none" strokeLinecap="round" opacity="0.90" />
          <path d="M2,-172 Q-28,-157 -58,-150" stroke="#0a2a17" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.90" />
          <path d="M2,-172 Q15,-189 25,-207" stroke="#071c0e" strokeWidth="5"   fill="none" strokeLinecap="round" opacity="0.82" />
          <path d="M2,-172 Q-11,-191 -21,-210" stroke="#0a2a17" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.76" />
        </g>
        {/* Small bush — far left */}
        <g transform="translate(34,496)" opacity="0.50">
          <path d="M0,0 Q2,-35 4,-70" stroke="#020b04" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="4"  cy="-74" r="25" fill="#061f14" />
          <circle cx="-16" cy="-62" r="18" fill="#0a2c1e" />
          <circle cx="24" cy="-60" r="16" fill="#061f14" />
        </g>

        {/* ── Warm horizon haze ── */}
        <ellipse cx="1220" cy="392" rx="480" ry="30"
          fill="#f07818" opacity="0.07" filter="url(#blur12)" />
      </svg>
    </div>
  )
}
