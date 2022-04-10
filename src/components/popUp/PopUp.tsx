import React, {FC} from 'react';

import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

type PopUpPropsType = {
  onPopUpClose: () => void;
  anchorEl: HTMLElement | null;
}

export const PopUp: FC<PopUpPropsType> = (
  {
    children,
    onPopUpClose,
    anchorEl
  }) => {

  const open = Boolean(anchorEl);

  return (
    <div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={onPopUpClose}
        disableRestoreFocus
      >
        <Typography sx={{p: 1}}>
          {children}
        </Typography>
      </Popover>
    </div>
  );
};