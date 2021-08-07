import React, { useState, useEffect } from "react";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import getAllItems, { ShopItem } from "../../services/get-all-items";
import LoadingSpinner from "../loader";
import ShoppingCart from "../shopping-cart";
import ShoppingItem from "../shopping-item";

interface Props { }

const ShopStore: React.FunctionComponent<Props> = () => {
  const sizes = [{ name: "All", value: "all" }, { name: "XS", value: "xsmall" }, { name: "S", value: "small" }, { name: "M", value: "medium" }, { name: "L", value: "large" }, { name: "XL", value: "xlarge" }];
  const options = [{ name: "All", value: "all" }, { name: "T-shirt", value: "t-shirt" }, { name: "Dress shirts", value: "dress shirts" }];

  const [originalItemList, setOriginalItemList] = useState<Array<ShopItem>>([]);
  const [shoppingItems, setShoppingItems] = useState<Array<ShopItem>>([]);
  const [filterName, setFilterName] = useState("all");
  const [isShowCart, setIsShowCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [optionName, setOptionName] = useState("all");


  useEffect(() => {
    fetchAllItems();
  }, []);

  useEffect(() => {
    getFilterdItems();
  }, [filterName, optionName]);

  const fetchAllItems = async () => {
    try {
      const items = await getAllItems();
      if (items && items.length > 0) {
        setOriginalItemList(items);
        setShoppingItems(items);
        setLoading(false);
      }
    } catch (error) {
      //TODO: Exception handling
      console.error('an error occured', error);
    }
  }

  const getFilterdItems = () => {
    if (filterName === "all" && optionName === "all") {
      setShoppingItems(originalItemList);
    } else if(optionName === "all"){
      const items = originalItemList.filter(item => item.details.size === filterName);
      setShoppingItems(items);
    } else if(filterName === "all") {
      const items = originalItemList.filter(item => item.details.type === optionName);
      setShoppingItems(items);
    } else {
      const items = originalItemList.filter(item => item.details.size === filterName && item.details.type === optionName);
      setShoppingItems(items);
    }
  }

  const selectFilter = (event: any) => {
    setFilterName(event);
  }

  const selectOption = (event: any) => {
    setOptionName(event);
  }

  const showCart = () => {
    setIsShowCart(true);
  }

  const onBack = () => {
    setIsShowCart(false);
  }

  return (
    <div>
      <p className="online-store-title">Shop Online</p>
      {loading && <LoadingSpinner />}
      {!loading && <div>
        <ShoppingCart showCart={isShowCart} onBack={onBack} />
        {!isShowCart && <div>
          <div className="cart-title"><Button variant="dark" onClick={showCart}>Show cart</Button></div>
          <div className="cart-title">      <Dropdown >
            <DropdownButton
              variant="dark"
              alignRight
              title="Select size"
              id="dropdown-menu-align-right"
              onSelect={selectFilter}

            >
              {sizes.map((size) => (
                <Dropdown.Item key={size.value} eventKey={size.value} value={size.value}>{size.name}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Dropdown></div>
          <div className="cart-title">      <Dropdown >
            <DropdownButton
              variant="dark"
              alignRight
              title="Select option"
              id="dropdown-menu-align-right"
              onSelect={selectOption}

            >
              {options.map((option) => (
                <Dropdown.Item key={option.value} eventKey={option.value} value={option.value}>{option.name}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Dropdown></div>

          {(!shoppingItems || shoppingItems.length === 0) && (<div>No items to show</div>)}
          {shoppingItems && shoppingItems.length > 0 && (<div className="shopping-list">
            <Row>
              {shoppingItems.map((item: ShopItem, index: number) => (
                <Col style={{ marginBottom: '50px', display: "flex", justifyContent: "center", paddingLeft: 0, paddingRight: 0 }} key={item.id}>
                  <ShoppingItem shoppingItem={item} isAddToCart={true} />
                </Col>
              ))}
            </Row>
          </div>)}
        </div>}
      </div>}

    </div>
  );
};

export default ShopStore;