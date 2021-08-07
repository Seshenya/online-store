import React from "react";
import { Card } from "react-bootstrap";
import { ShopItem } from "../../services/get-all-items";

interface Props {
    shoppingItem: ShopItem;
}

const ShoppingItem: React.FunctionComponent<Props> = ({shoppingItem}) => {
    return (
        <div>
            <Card  style={{ width: '450px', height: ' 550px' }} border="light" bg='light' text='dark'>
                <Card.Header style={{ fontSize:20, height:50 }}>
                    <div>{shoppingItem.details.tag}</div></Card.Header>
                <Card.Body>
                    <Card.Img style={{ width: '250px', height: ' 300px' }} src={shoppingItem.details.image} />
                    <Card.Text>
                    {shoppingItem.name}
                    </Card.Text>
                    <Card.Text>
                    $ {shoppingItem.details.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ShoppingItem;