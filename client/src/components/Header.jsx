import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";

const Header = (props) => {
  return (
    <Stack spacing={2} direction={"row"}>
      <Button LinkComponent={Link} to='/'>
        Home
      </Button>
      <Button LinkComponent={Link} to='/admin'>
        Admin panel
      </Button>
      <Button LinkComponent={Link} to='/signin'>
        Login
      </Button>
      <Button LinkComponent={Link} to='/signup'>
        Register
      </Button>
    </Stack>
  );
};
export default Header;
