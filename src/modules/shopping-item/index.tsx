import React from "react";
import { Button, Card } from "react-bootstrap";
import { ShopItem } from "../../services/get-all-items";
import { addToCart, removeFromCart } from "../shopping-cart/cart-counter";
import { useAppDispatch } from '../../hooks'

interface Props {
    shoppingItem: ShopItem;
    isAddToCart: boolean;
}

const ShoppingItem: React.FunctionComponent<Props> = ({ shoppingItem, isAddToCart }) => {
    const dispatch = useAppDispatch();

    const addCart = (item: ShopItem) => {
        dispatch(addToCart(item))
    }

    const removeCart = (item: ShopItem) => {
        dispatch(removeFromCart(item))
    }

    return (
        <div className="shop-item">
            <Card style={{ width: '350px', height: ' 450px' }} border="light" bg='light' text='dark'>
                <Card.Header style={{ fontSize: 20, height: 50 }}>
                    <div>{shoppingItem.details.tag}</div></Card.Header>
                <Card.Body>
                    <Card.Img style={{ width: '150px', height: '200px' }} src={shoppingItem.details.image} />
                    <Card.Text className="card-text">
                        {shoppingItem.name}
                    </Card.Text>
                    <Card.Text>
                        $ {shoppingItem.details.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{isAddToCart && <Button variant="dark" onClick={(): void => addCart(shoppingItem)}>Add to Cart</Button>}
                    {!isAddToCart && <Button variant="dark" onClick={(): void => removeCart(shoppingItem)}>Remove from Cart</Button>}</Card.Footer>
            </Card>
        </div>
    );
};

export default ShoppingItem;
