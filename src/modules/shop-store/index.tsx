import React, { useState, useEffect } from "react";
import { Button, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import getAllItems, { ShopItem } from "../../services/get-all-items";
import LoadingSpinner from "../loader";
import ShoppingCart from "../shopping-cart";
import ShoppingItem from "../shopping-item";

interface Props { }

const ShopStore: React.FunctionComponent<Props> = () => {
  const sizes = [{ name: "All", value: "all" }, { name: "XS", value: "xsmall" }, { name: "S", value: "small" }, { name: "M", value: "medium" }, { name: "L", value: "large" }, { name: "XL", value: "xlarge" }];
  const [originalItemList, setOriginalItemList] = useState<Array<ShopItem>>([]);
  const [shoppingItems, setShoppingItems] = useState<Array<ShopItem>>([]);
  const [filterName, setFilterName] = useState("");
  const [isShowCart, setIsShowCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);



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
        setLoading(false);
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