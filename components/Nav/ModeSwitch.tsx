import React from 'react';
import { useTheme } from 'next-themes';
import { Switch, Tooltip } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { UseThemeProps } from 'next-themes/dist/types';

export default function ModeSwitch() {
  const { theme, setTheme }: UseThemeProps = useTheme();

  function handleToggle(_e: React.ChangeEvent<HTMLInputElement>) {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <Tooltip title={theme === 'dark' ? 'Dark mode' : 'Light mode'}>
          <Switch checked={theme === 'dark'} onChange={handleToggle} />
        </Tooltip>
        {theme === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      </div>
    </>
  );
}
