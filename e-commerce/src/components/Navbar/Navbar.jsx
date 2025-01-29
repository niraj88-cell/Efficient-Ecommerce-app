import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center; /* Fixed typo from align-iitems to align-items */
  gap: 20px;
`;

const Language = styled.div`
  font-size: 14px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative; /* Add relative position to contain the icon */
`;

const Center = styled.div`
  font-weight: 600;
`;

const Right = styled.div`
  display: flex;
`;

const Input = styled.input`
  height: 25px;
  border: none;
  padding-left: 10px;
`;

const MenuItem = styled.div`
  font-size: 16px;
  margin-left: 30px;
  cursor: pointer;
`;

const Icon = styled.div`
  position: absolute;
  right: 10px; /* Ensure the icon is correctly positioned inside the input */
  display: flex;
  align-items: center;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  console.log("user",user);

  return (
    <Container>
      <Wrapper>
        <Main>
          <Left>
            <Language>
              <h4>EN</h4>
            </Language>
            <Search>
              <Input placeholder="Search" />
              <Icon>
                <SearchIcon />
              </Icon>
            </Search>
          </Left>

          <Center>
            <h1>NIRAJ.</h1>
          </Center>

          <Right>
            <MenuItem>
              <Link to="/register">REGISTER</Link>
            </MenuItem>

            <MenuItem>
            {user ? <span>Welcome, {user.username}</span>: <Link to="/login">SIGN IN</Link>}
            </MenuItem>

            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Main>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
