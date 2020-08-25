import React, { useEffect, useState, useMemo } from 'react';
import { Typography, Input, Select } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Cart from '../../components/Cart/Cart';
import { getProducts } from '../../store/actions/productsActions';
import ProductCard from '../../components/Product/Product';
import { categories } from '../../constants/categories';
import { filter } from '../../util/filterProducts';

import Layout from '../../layout/Layout';

import './styles.css';

const { Option } = Select;
const { Search } = Input;

const Home = ({ products: { products }, getProducts, cartItems }) => {
  useEffect(() => {
    getProducts();
  }, []);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const filteredProducts = useMemo(
    () => filter(products, categoryFilter, nameFilter, priceFilter),
    [categoryFilter, nameFilter, priceFilter, products],
  );

  return (
    <Layout>
      <div className="home">
        <div className="home-page">
          <Typography.Title level={2}>Amazona E-Commerce</Typography.Title>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography.Text strong>Filter By : &nbsp;</Typography.Text>
            <Select
              defaultValue="Select a Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
            >
              <Option value={''}>All Categories</Option>
              {categories.map((x) => (
                <Option value={x}>{x}</Option>
              ))}
            </Select>
            <Search
              placeholder="Search..."
              onSearch={setNameFilter}
              style={{ flex: 1 }}
              enterButton
            />
            <Select
              defaultValue="Sort Price by"
              value={priceFilter}
              onChange={setPriceFilter}
              style={{ marginRight: 20 }}
            >
              <Option value={''}>Sort By: All</Option>
              <Option value={'asc'}>Price: Lowest to Highest</Option>
              <Option value={'desc'}>Price: Highest to Lowest</Option>
            </Select>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', paddingTop: 16 }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => <ProductCard key={product._id} item={product} />)
            ) : (
              <Typography.Text strong>No Results found.. &#128533; </Typography.Text>
            )}
          </div>
        </div>
        {cartItems.length ? <Cart /> : null}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  products: state.products,
});

export default compose(connect(mapStateToProps, { getProducts }))(Home);
