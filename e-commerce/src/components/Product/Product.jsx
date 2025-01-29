import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Navbar from '../Navbar/Navbar';
import Announcement from '../Annoucmenet/Announcement'; // Corrected typo
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userRequest } from '../../requestMethod';

// Styled components (same as before)
const InfoContainer = styled.div`
  position: absolute;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s ease;
`;

const Container = styled.div`
  height: max-content;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 140px;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid lightgray;
  background-color: #aec6cf;

  img {
    width: 420px;
    height: 450px;
  }

  &:hover ${InfoContainer} {
    opacity: 1;
  }

  &:hover {
    background-color: lightgray;
  }

  &:hover img {
    opacity: 0.4;
  }
`;

const Link1 = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  margin: 5px;
`;

const Category = styled.div`
  width: 100%;
  height: 7vh;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  select {
    width: 80px;
    height: 40px;
  }
`;

const Option2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  select {
    width: 80px;
    height: 40px;
  }
`;

const Option3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  select {
    width: 100px;
    height: 40px;
  }
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: bold;
  display: flex;
  align-items: flex-start;
  padding: 0px 50px;
`;

const Filter = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const Sort = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

const Opt = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Main = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const Product = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle filter changes
  const handleChange = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await userRequest.get(
          cat ? `/product/find?category=${cat}` : "/product/find"
        
        );
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err.response ? err.response.data : err.message);
      }
    };
    getProduct();
  }, [cat]);

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      setFilteredProducts(products); // If filter is empty, show all products
    } else {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key] && item[key].includes(value)
          )
        )
      );
    }
  }, [cat, products, filter]);
  
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "price(asc)") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "price(desc)") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  

  return (
    <Container>
      {/* Only show Navbar if the current location is NOT Home */}
      {location.pathname !== '/' && <Navbar />}
      {location.pathname !== '/' && (
        <Category>
          <Title>Dresses</Title>
          <Left>
            <Opt>
              <Option>
                <Filter>Filter Products:</Filter>
                <select name="color" onChange={handleChange}>
                  <option value="">Color</option>
                  {[...new Set(products.map(p => p.color))].map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </Option>
              <Option2>
                <select name="size" onChange={handleChange}>
                  <option value="">Size</option>
                  {[...new Set(products.map(p => p.size))].map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </Option2>
            </Opt>
            <Option3>
              <Sort>Sort Products:</Sort>
              <select name="sort" onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort</option>
                <option value="newest">Newest</option>
                <option value="price(asc)">Price (asc)</option>
                <option value="price(desc)">Price (desc)</option>
              </select>
            </Option3>
          </Left>
        </Category>
      )}
      <Main>
    
      {filteredProducts.length > 0 ? (
  filteredProducts.map((product) => (
    <Link to={`/product/${product._id}`} key={product._id}>
      <ImgContainer>
        <img src={product.img} alt={product.title} />
        <InfoContainer>
          <Link1>
            <LocalGroceryStoreOutlinedIcon />
          </Link1>
          <Link1>
            <SearchOutlinedIcon />
          </Link1>
          <Link1>
            <FavoriteBorderOutlinedIcon />
          </Link1>
        </InfoContainer>
      </ImgContainer>
    </Link>
  ))
) : (
  <p>No products found</p>
)}

      </Main>
    </Container>
  );
};

export default Product;
