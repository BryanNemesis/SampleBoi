import { useCallback, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import useClickOutside from './UseClickOutside'

const ColorPicker: React.FC = () => {
  const popover = useRef<any>()
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('#27272a')

  // TODO: save favorite colors for a user??
  const presetColors = [
    '#fafafa',
    '#f4f4f5',
    '#e4e4e7',
    '#d4d4d8',
    '#a1a1aa',
    '#71717a',
    '#52525b',
    '#3f3f46',
    '#27272a',
    '#18181b',
    '#f7fee7',
    '#ecfccb',
    '#d9f99f',
    '#bef264',
    '#a3e635',
    '#84cc16',
    '#65a30d',
    '#4d7c0f',
    '#3f6212',
    '#365314',
    '#fff1f2',
    '#ffe4e6',
    '#fecdd3',
    '#fda4af',
    '#fb7185',
    '#f43f5e',
    '#e11d48',
    '#be123c',
    '#9f1239',
    '#881337',
  ]

  const close = useCallback(() => setOpen(false), [])
  useClickOutside(popover, close)

  return (
    <>
      {open && (
        <div ref={popover} className="z-0 -mr-32 rounded-md bg-slate-200 sm:-mr-72">
          <HexColorPicker color={color} onChange={setColor} />
          <div className="grid grid-cols-8 p-1">
            {presetColors.map(presetColor => (
              <button
                key={presetColor}
                className="m-0.5 h-5 w-5 cursor-pointer rounded-md"
                style={{ background: presetColor }}
                onClick={() => setColor(presetColor)}
              />
            ))}
          </div>
        </div>
      )}
      <div onClick={() => setOpen(true)} className="flex items-center gap-x-2">
        <div
          style={{ backgroundColor: color }}
          className="h-5 w-20 rounded-md border border-slate-300"
        ></div>
        <i className="fa-solid fa-hand-pointer text-lime-400"></i>
      </div>
    </>
  )
}

export default ColorPicker
