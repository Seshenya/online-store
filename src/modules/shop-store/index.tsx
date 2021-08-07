import React, { useState, useEffect } from "react";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import getAllItems, { ShopItem } from "../../services/get-all-items";
import ShoppingCart from "../shopping-cart";
import ShoppingItem from "../shopping-item";

interface Props { }

const ShopStore: React.FunctionComponent<Props> = () => {
  const sizes = [{ name: "All", value: "all" }, { name: "XS", value: "xsmall" }, { name: "S", value: "small" }, { name: "M", value: "medium" }, { name: "L", value: "large" }, { name: "XL", value: "xlarge" }];
  const [originalItemList, setOriginalItemList] = useState<Array<ShopItem>>([]);
  const [shoppingItems, setShoppingItems] = useState<Array<ShopItem>>([]);
  const [filterName, setFilterName] = useState("");
  const [isShowCart, setIsShowCart] = useState<boolean>(false);


  useEffect(() => {
    fetchAllItems();
  }, []);

  useEffect(() => {
    getFilterdItems();
  }, [filterName]);

  const fetchAllItems = async () => {
    try {
      const items = await getAllItems();
      if (items && items.length > 0) {
        setOriginalItemList(items);
        setShoppingItems(items);
      }
    } catch (error) {
      //TODO: Exception handling
      console.error('an error occured', error);
    }
  }

  const getFilterdItems = () => {
    if (filterName === "all") {
      setShoppingItems(originalItemList);
    } else {
      const items = originalItemList.filter(item => item.details.size === filterName);
      setShoppingItems(items);
    }
  }

  const selectFilter = (event: any) => {
    setFilterName(event);
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
      <ShoppingCart showCart={isShowCart} onBack={onBack}/>     
      {!isShowCart && <div>
        <Button onClick={showCart}>Show cart</Button>
      <Dropdown >
        <DropdownButton
          alignRight
          title="Select size"
          id="dropdown-menu-align-right"
          onSelect={selectFilter}

        >
          {sizes.map((size) => (
            <Dropdown.Item key={size.value} eventKey={size.value} value={size.value}>{size.name}</Dropdown.Item>
          ))}
        </DropdownButton>
      </Dropdown>
      {(!shoppingItems || shoppingItems.length === 0) && (<div>No items to show</div>)}
      {shoppingItems && shoppingItems.length > 0 && (<div>
        <Row>
          {shoppingItems.map((item: ShopItem, index: number) => (
            <Col xs={12} md={6} lg={3} style={{ marginBottom: '50px', display: "flex", justifyContent: "center", paddingLeft: 0, paddingRight: 0 }} key={item.id}>
              <ShoppingItem shoppingItem={item} isAddToCart={true} />
            </Col>
          ))}
        </Row>
      </div>)}
      </div>}

    </div>
  );
};

export default ShopStore;