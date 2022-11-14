import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { MdOutlineModeNight, MdOutlineLightMode } from 'react-icons/md';

export default function ModeSwitch() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  function handleToggle() {
    setEnabled(!enabled);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
          <div
            onClick={handleToggle}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"
          />
          <span className="ml-2 text-sm font-medium cursor-default">
            {theme === 'light' ? <MdOutlineModeNight /> : <MdOutlineLightMode />}
          </span>
        </label>
      </div>
    </div>
  );
}
