import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useAppSelector } from '../../hooks'
import { ShopItem } from '../../services/get-all-items';
import ShoppingItem from '../shopping-item';

interface Props {
    showCart: boolean;
    onBack: () => void;
 }

const ShoppingCart: React.FunctionComponent<Props> = ({showCart, onBack}) => {
    const count = useAppSelector((state) => state.counter.value);
    const list = useAppSelector((state) => state.counter.shoppingList)
    return (
        <div>
            <p className="online-store-title">Cart</p>
            <span>{count} Items</span>            
            {showCart && <div>
                <Button onClick={onBack}>Back</Button>
                {list && list.length > 0 && (<div>
                    <Row>
                        {list.map((item: ShopItem, index: number) => (
                            <Col xs={12} md={6} lg={3} style={{ marginBottom: '50px', display: "flex", justifyContent: "center", paddingLeft: 0, paddingRight: 0 }} key={item.id}>
                                <ShoppingItem shoppingItem={item} isAddToCart={false} />
                            </Col>
                        ))}
                    </Row>
                </div>)}
            </div>}
        </div>)
};

export default ShoppingCart;

