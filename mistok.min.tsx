const Mistok = ({ vars }: { vars: object | unknown[] }) => {
  /**
   * Usage:
   * <Mistok vars={{ myObject, myArray, anotherObject }} />
   */

  const varNames = Object.keys(vars).sort((a, b) => a.length - b.length)
  const $ = (q: string) => document?.querySelectorAll(q)
  // eslint-disable-next-line no-eval
  const jsonEval = (str: string) => JSON.stringify(eval(str), null, 3)
  const buttonStyle =
    'mistok-btn p-2 rounded-lg text-xs cursor-pointer bg-[#21262C] text-[#BCC0C3]'

  const updateCurrentViewed = (key: string) => {
    $(`.mistok-pre,.mistok-debug-btn`).forEach((el) =>
      el.classList.remove('active')
    )
    $(
      `.mistok-pre[data-key="${key}"],.mistok-debug-btn[data-key="${key}"]`
    ).forEach((el) => el.classList.add('active'))
  }

  const svgGen = (...elements: JSX.Element[]) => (
    <svg
      height="14"
      width="14"
      viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2">
        {elements}
      </g>
    </svg>
  )

  const eyeIcon = svgGen(
    <path
      key="eye-p"
      d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
    />,
    <circle
      key="eye-c"
      cx="12"
      cy="12"
      r="3"
    />
  )

  const clipBoardIcon = svgGen(
    <rect
      key="clip-r"
      width="8"
      height="4"
      x="8"
      y="2"
      rx="1"
      ry="1"
    />,
    <path
      key="clip-p"
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
    />
  )

  const checkIcon = svgGen(
    <path
      stroke-width="2"
      d="M20 6L9 17l-5-5"
    />
  )

  const toggleClipboard = (target: number) => {
    $('.mistok-copy-btn').forEach((el, i) =>
      i === target ? el.classList.add('active') : el.classList.remove('active')
    )
  }

  const copyToClipboard = () => {
    const activeTextContent = $('.mistok-pre.active')[0]?.textContent || ''
    navigator.clipboard.writeText(jsonEval(JSON.parse(activeTextContent)))

    toggleClipboard(1)
    setTimeout(() => toggleClipboard(0), 1000)
  }

  const toggleVisibility = () => {
    $('.mistok-details,.mistok-debug-btns,.mistok-copy-btn')?.forEach((el) =>
      el.classList.toggle('hidden')
    )
    $('.mistok-section')[0]?.classList.toggle('w-125')
  }

  return (
    <div className="mistok-section fixed left-4 top-4 z-[100] h-auto max-h-125 w-125 overflow-hidden rounded-xl bg-[#0D1116] text-xs text-[#d1d3d4] shadow-xl">
      <style>{`.mistok-pre:not(.active),.mistok-copy-btn:not(.active){display:none}.mistok-debug-btn.active{background:#5046E5}.mistok-section *{scrollbar-width:none}`}</style>
      <div className="flex w-full justify-between gap-2 rounded-t-xl bg-[#161B22] px-6 py-4">
        <div className="mistok-debug-btns flex flex-wrap gap-2">
          {varNames.map((key, i) => (
            <button
              key={key}
              data-key={key}
              className={`mistok-debug-btn ${buttonStyle} ${
                i === 0 && 'active'
              }`}
              onClick={() => updateCurrentViewed(key)}>
              {key}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-2">
          <button
            className={`mistok-copy-btn active ${buttonStyle}`}
            onClick={() => copyToClipboard()}>
            {clipBoardIcon}
          </button>
          <button className={`mistok-copy-btn ${buttonStyle}`}>
            {checkIcon}
          </button>
          <button
            className={buttonStyle}
            onClick={() => toggleVisibility()}>
            {eyeIcon}
          </button>
        </div>
      </div>

      <div className="mistok-details leading-5 h-125">
        {varNames.map((key, index) => (
          <pre
            // eslint-disable-next-line react/no-array-index-key
            key={`${key}-${index}`}
            data-key={key}
            className={`mistok-pre h-full overflow-y-scroll whitespace-pre-wrap p-6 pb-32 ${
              index === 0 && 'active'
            }`}>
            {jsonEval(vars[key as keyof typeof vars] as string)}
          </pre>
        ))}
      </div>
    </div>
  )
}
