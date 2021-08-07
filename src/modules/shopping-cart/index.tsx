import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useAppSelector } from '../../hooks'
import { ShopItem } from '../../services/get-all-items';
import ShoppingItem from '../shopping-item';

interface Props {
    showCart: boolean;
    onBack: () => void;
}

const ShoppingCart: React.FunctionComponent<Props> = ({ showCart, onBack }) => {
    const count = useAppSelector((state) => state.counter.value);
    const list = useAppSelector((state) => state.counter.shoppingList)
    return (
        <div>
            <div className="cart-title"><span>Cart - {count} Items</span></div>
            {showCart && <div>
                <div className="cart-title"><Button variant="dark" onClick={onBack}>Back</Button></div>
                {list && list.length > 0 && (<div className="shopping-list">
                    <Row>
                        {list.map((item: ShopItem, index: number) => (
                            <Col style={{ marginBottom: '50px', display: "flex", justifyContent: "center", paddingLeft: 0, paddingRight: 0 }} key={item.id}>
                                <ShoppingItem shoppingItem={item} isAddToCart={false} />
                            </Col>
                        ))}
                    </Row>
                </div>)}
            </div>}
        </div>)
};

export default ShoppingCart;

