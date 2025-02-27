const Mistok = ({ vars }: { vars: object | unknown[] }) => {
  /**
   * Usage: <Mistok vars={{ myObject, myArray, anotherObject }} />
   */

  /* eslint-disable @next/next/no-img-element, react/no-array-index-key, no-eval, jsx-a11y/alt-text */
  type str = string
  const $ = (q: string) => document?.querySelectorAll(q)
  const varNames = Object.keys(vars).sort((a, b) => a.length - b.length)
  const btnStyle =
    'mstk-btn p-2 rounded-lg cursor-pointer bg-[#21262C] flex gap-1 transition-all'
  const clipImg = $('.mstk-copy-btn img')[0] as HTMLImageElement
  const eyeImg = $('.mstk-eye-btn img')[0] as HTMLImageElement
  const baseImgURL = 'https://gist.githubusercontent.com/neontomo/'
  const icons = {
    eye: 'f4d701a17860de85d9701ca5998e3208/raw/bf20de88ebcd7b6aac741b1a614561363564a91d/eyeicon.svg',
    eyeClosed:
      '79a57fdacec80ffe94aed0fbc063eac4/raw/7fddda66b4eb55f98b4755a0177c91e474236584/eyeclosed.svg',
    clip: '00971f9d2ff7cd0b382f5a47ed7d8d5f/raw/a7606bf4083928363a7450b253ee81b13dd720d7/clipboard.svg',
    check:
      '6d01eb249d8baa40abd624eeb124d98c/raw/24c5ccc0be6df266dc40d1e8db7acfba3813bd25/checkmarkIcon.svg',
    json: 'f264dcdfc18cbbb522e6a40eaa4a0654/raw/3062366e0a2cdd9a7ab377f5b9f5a8392682508e/json.svg'
  }
  const jsonEval = (s: str) => JSON.stringify(eval(s), null, 3)
  const imgGen = (s: str) => <img src={`${baseImgURL}${s}`} />

  const updateCurrent = (k: str) => {
    $('.mstk-pre,.mstk-debug-btn').forEach((el) => {
      if (el.getAttribute('data-key') === k) el.classList.add('active')
      else el.classList.remove('active')
    })
  }

  const toggleIcon = (img: HTMLImageElement, m: str, a: str, b: str) =>
    (img.src = `${baseImgURL}${img.src.includes(m) ? a : b}`)

  const copyToClipboard = () => {
    const activeTextContent = $('.mstk-pre.active')[0]?.textContent || ''
    navigator.clipboard.writeText(jsonEval(JSON.parse(activeTextContent)))
    toggleIcon(clipImg, 'clip', icons.check, icons.clip)
    setTimeout(() => toggleIcon(clipImg, 'clip', icons.check, icons.clip), 1000)
  }

  const toggleVisibility = () => {
    $('.mstk-details')[0].classList.toggle('hidden')
    toggleIcon(eyeImg, 'closed', icons.eye, icons.eyeClosed)
  }

  return (
    <div className="mstk-section fixed top-4 left-4 z-[100] h-auto max-h-[40rem] w-[30rem] overflow-hidden rounded-xl bg-[#0D1116] text-xs text-[#d1d3d4]">
      <style>{`.mstk-pre:not(.active){display:none}.mstk-debug-btn.active{background:#5046E5}.mstk-section *{scrollbar-width:none}`}</style>
      <div className="flex w-full justify-between gap-2 bg-[#161B22] p-4">
        <div className="mstk-debug-btns flex flex-wrap gap-2">
          {varNames.map((k, i) => (
            <button
              key={k}
              data-key={k}
              className={`mstk-debug-btn ${btnStyle} ${i === 0 && 'active'}`}
              onClick={() => updateCurrent(k)}>
              {imgGen(icons.json)}
              {k}
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2">
          <button
            className={`mstk-copy-btn ${btnStyle}`}
            onClick={() => copyToClipboard()}>
            {imgGen(icons.clip)}
          </button>
          <button
            className={`mstk-eye-btn ${btnStyle}`}
            onClick={() => toggleVisibility()}>
            {imgGen(icons.eyeClosed)}
          </button>
        </div>
      </div>
      <div className="mstk-details h-[40rem] p-4 leading-5">
        {varNames.map((k, i) => (
          <pre
            key={`${k}-${i}`}
            data-key={k}
            className={`mstk-pre h-full overflow-y-scroll pb-32 whitespace-pre-wrap ${
              i === 0 && 'active'
            }`}>
            {jsonEval(vars[k as keyof typeof vars] as str)}
          </pre>
        ))}
      </div>
    </div>
  )
}
