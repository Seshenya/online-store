import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShopItem } from '../../services/get-all-items'
import type { RootState } from '../../store'

// Define a type for the slice state
interface CounterState {
    value: number;
    shoppingList: Array<ShopItem>;
}

// Define the initial state using that type
const initialState: CounterState = {
    value: 0,
    shoppingList: []
}

export const cartCounter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ShopItem>) => {
            state.value += 1;
            state.shoppingList.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<ShopItem>) => {
            state.value -= 1;
            const filteredList = state.shoppingList.filter(listItem => listItem.id !== action.payload.id);
            state.shoppingList = [...filteredList];
        },
    },
})

export const { addToCart, removeFromCart } = cartCounter.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default cartCounter.reducer
