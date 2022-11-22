import React from 'react';
import { useTheme } from 'next-themes';
import {Switch, Tooltip} from '@mui/material';
import { MdOutlineModeNight, MdOutlineLightMode } from 'react-icons/md';

export default function ModeSwitch() {
  const { theme, setTheme } = useTheme();

  function handleToggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <Tooltip title={theme === 'dark' ? 'Dark mode' : 'Light mode'}>
          <Switch checked={theme === 'dark'} onChange={() => handleToggle()} />
        </Tooltip>
        {theme === 'dark' ? <MdOutlineModeNight /> : <MdOutlineLightMode />}
      </div>
    </>
  );
}

// export default function ModeSwitch() {
//   const [enabled, setEnabled] = useState<boolean>(false);
//   const { theme, setTheme } = useTheme();

//   function handleToggle() {
//     setEnabled(!enabled);
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   }

//   return (
//     <div className="flex flex-col items-center justify-center overflow-hidden">
//       <div className="flex">
//         <label className="inline-flex relative items-center cursor-pointer">
//           <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
//           <div
//             onClick={handleToggle}
//             className="w-11 h-6 bg-gray-400 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
//           />
//           <span className="ml-2 text-sm font-medium cursor-default">
//             {theme === 'light' ? <MdOutlineModeNight /> : <MdOutlineLightMode />}
//           </span>
//         </label>
//       </div>
//     </div>
//   );
// }
