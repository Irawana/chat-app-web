import React from "react";
import { Grid } from "@material-ui/core";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Home = () => (
    <Grid container spacing={3}>
        <SignIn />
        <SignUp />
    </Grid>
);

export default Home;
