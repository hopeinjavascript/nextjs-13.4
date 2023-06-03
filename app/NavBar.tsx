'use client';
import React from 'react';

import { Navbar, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';

/*
# Migrating from the pages directory:
    > The new useRouter hook should be imported from next/navigation and not next/router
    > The pathname string has been removed and is replaced by usePathname()
    > The query object has been removed and is replaced by useSearchParams()
*/
// import { useRouter } from 'next/router'; // this will work with pages directory

// this is the import that will work with the app router
// earlier you could get the pathname from the router.pathname but in next js 13.4 "app router" it is split into three parts/hooks
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const NavBar = () => {
  const router = useRouter(); // for navigating programmatically
  const pathname = usePathname(); // get the current pathname/segment from the usl
  const searchParams = useSearchParams(); // get the query string/params

  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        {/* best of both the worlds -
                - styling it link Nav (react-bootstrap)
                - and behave like Link (next)
            because normal Linking refreshes the page causing efficient navigation and
            mostly importantly we will lose the state we have maintained
        */}
        <Navbar.Brand as={Link} href="/">
          NextJS 13.4
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link
              as={Link}
              href="/dashboard"
              active={pathname === '/dashboard'} // active / inactive
            >
              dashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
