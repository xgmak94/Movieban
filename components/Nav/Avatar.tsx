import React, { useState } from 'react';
import { Button, Avatar, Menu, MenuItem } from '@mui/material';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

export default function AvatarButton() {
  const router = useRouter();
  const user = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
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
        onClick={handleClick}
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
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/profile');
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            handleClose();
            supabaseClient.auth.signOut();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
