import React, { useState } from 'react';
import { Button, Avatar, Menu, MenuItem } from '@mui/material';
import { type User, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { type NextRouter, useRouter } from 'next/router';

export default function AvatarButton() {
  const router: NextRouter = useRouter();
  const user: User | null = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(_event: {}, _reason: 'backdropClick' | 'escapeKeyDown') {
    setAnchorEl(null);
  }

  function handleProfile(_e: React.MouseEvent<HTMLLIElement>) {
    setAnchorEl(null);
    router.push('/profile');
  }

  function handleLogout(_e: React.MouseEvent<HTMLLIElement>) {
    setAnchorEl(null);
    supabaseClient.auth.signOut();
  }

  const supabaseClient = useSupabaseClient();
  supabaseClient.auth.onAuthStateChange(async (event) => {
    if (event === 'SIGNED_OUT') {
      router.push('/');
    }
  });

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
      >
        <Avatar alt="avatar" src={user?.user_metadata.avatar_url} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
