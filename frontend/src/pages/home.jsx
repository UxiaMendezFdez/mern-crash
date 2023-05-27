import React from "react";
import { Button, Card, Image } from "react-bootstrap";

const Home = () => {
  return (
    <div className="text-center">
      <Card body className="m-2 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Card>
      <Image
        width={"200px"}
        className="d-block m-auto"
        fluid={true}
        src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt="puppy"
      />
      <Button className="mt-2" variant="outline-secondary">
        Read More
      </Button>
    </div>
  );
};

export default Home;
