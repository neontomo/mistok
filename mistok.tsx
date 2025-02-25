/**
 * Usage:
 * <Mistok vars={{ myObject, myArray, anotherObject }} />
 */

const Mistok = ({ vars }: { vars: object | unknown[] }) => {
  const varsAsStrings = Object.keys(vars).sort((a, b) => a.length - b.length)

  const qAll = (query: string) => document?.querySelectorAll(query)
  const jsonEval = (str: string) => JSON.stringify(eval(str), null, 3)

  const updateCurrentViewed = (key: string) => {
    qAll(`.mistok-pre`).forEach((pre) => pre.classList.add('hidden'))
    qAll(`.mistok-pre[data-key="${key}"]`)[0].classList.remove('hidden')
    qAll(`.mistok-btn`).forEach((btn) => btn.classList.remove('active'))
    qAll(`.mistok-btn[data-key="${key}"]`)[0].classList.add('active')
  }

  const copyToClipboard = () => {
    const activeTextContent =
      qAll('.mistok-pre:not(.hidden)')[0].textContent || ''
    navigator.clipboard.writeText(jsonEval(JSON.parse(activeTextContent)))
  }

  const buttonStyle =
    'mistok-btn p-2 rounded-lg text-xs cursor-pointer bg-[#21262C] text-[#BCC0C3]'

  const svgMaker = (...elements: JSX.Element[]) => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2">
        {elements}
      </g>
    </svg>
  )

  const eyeIcon = svgMaker(
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

  const clipBoardIcon = svgMaker(
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

  return (
    <div className="mistok-section fixed top-4 left-4 z-[100] bg-[#0D1116] text-[#d1d3d4] rounded-xl h-auto max-h-125 w-125 shadow-xl text-xs overflow-hidden">
      <style>{`.mistok-btn.active{background:#5046E5}.mistok-section *{scrollbar-width:none}`}</style>
      <div className="bg-[#161B22] rounded-t-xl px-6 py-4 flex gap-2 justify-between">
        <div className="flex gap-2 flex-wrap">
          {varsAsStrings.map((key, index) => (
            <button
              key={key}
              className={`${buttonStyle} ${index === 0 && 'active'}`}
              data-key={key}
              onClick={() => updateCurrentViewed(key)}>
              {key}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            className={buttonStyle}
            onClick={() => copyToClipboard()}>
            {clipBoardIcon}
          </button>
          <button
            className={buttonStyle}
            onClick={() =>
              qAll('.mistok-details')[0].classList.toggle('hidden')
            }>
            {eyeIcon}
          </button>
        </div>
      </div>

      <div className="mistok-details h-125 leading-5">
        {varsAsStrings.map((key, index) => (
          <pre
            key={`${key}-${index}`}
            data-key={key}
            className={`mistok-pre whitespace-pre-wrap h-full p-6 overflow-x-hidden overflow-y-scroll pb-32 ${
              index > 0 && 'hidden'
            }`}>
            {jsonEval(vars[key as keyof typeof vars] as string)}
          </pre>
        ))}
      </div>
    </div>
  )
}
