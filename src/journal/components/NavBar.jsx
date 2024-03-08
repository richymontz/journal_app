import { LoginOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogutUser } from "../../store";

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogutUser());
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >

        <Toolbar>
          <IconButton
            color='inherit'
            edge='start'
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuOutlined />
          </IconButton>

          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant="h6" noWrap component='div'> Journal App</Typography>
            <IconButton
              color="error"
              onClick={onLogout}
            >
              <LoginOutlined />
            </IconButton>
          </Grid>
        </Toolbar>

      </AppBar>
    </>
  )
}
