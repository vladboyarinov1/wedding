import React, { FC } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

type PropsType = {
  isOpen: boolean
  message: null | string
  setStatus: (status: boolean) => void
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={20} ref={ref} variant={'filled'} {...props} />
})

export const SuccessfulSnackbar: FC<PropsType> = ({ isOpen, message, setStatus }) => {
  const handleClose = (_event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setStatus(false)
  }

  return (
    <>
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={isOpen}>
        <Alert
          onClose={handleClose}
          severity={'success'}
          sx={{
            background:
              'linear-gradient(147.71deg, var(--color-blue-lightest) 0%, var(--color-blue-darkest) 100%)',
            width: '100%',
          }}
        >
          <span>{message}</span>
        </Alert>
      </Snackbar>
    </>
  )
}
