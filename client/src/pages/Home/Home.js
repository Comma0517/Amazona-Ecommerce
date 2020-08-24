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
      <div className="home-page">
        <Typography.Title level={2}>Amazona E-Commerce</Typography.Title>
        <Typography.Title level={4}>Buy and Sell globally.</Typography.Title>
        <div>
          <Typography.Text strong>Filter By:</Typography.Text>

          <div style={{ display: 'flex' }}>
            <Select
              defaultValue="Select a Category"
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ marginRight: 20 }}
            >
              <Option value={''}>Select a Category</Option>
              {categories.map((x) => (
                <Option value={x}>{x}</Option>
              ))}
            </Select>
            <Select
              defaultValue="Select a Category"
              value={priceFilter}
              onChange={setPriceFilter}
              style={{ marginRight: 20 }}
            >
              <Option value={''}>Set Price Filter</Option>
              <Option value={'asc'}>Lowest to Highest</Option>
              <Option value={'desc'}>Highest to Lowest</Option>
            </Select>
            <Search placeholder="Search by name" onSearch={setNameFilter} style={{ width: 200 }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {filteredProducts.map((product) => (
              <ProductCard item={product} />
            ))}
          </div>
        </div>
      </div>
      {cartItems.length ? <Cart /> : null}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  products: state.products,
});

export default compose(connect(mapStateToProps, { getProducts }))(Home);
