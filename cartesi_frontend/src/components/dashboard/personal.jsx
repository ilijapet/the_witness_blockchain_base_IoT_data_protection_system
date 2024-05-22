import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Personal() {
  return (
    <React.Fragment>
      <Title>You are protecting </Title>
      <Typography component="p" variant="h4">
        Volvo FH16 Aero
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        from 15 March, 2024
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View statistic
        </Link>
      </div>
    </React.Fragment>
  );
}
