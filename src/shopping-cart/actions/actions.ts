//'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieCart = (): { [id: string]: number } => {
    if (hasCookie('cart')) {
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
        return cookieCart;
    }
    return {};
}

export const addProductToCart = (id: string) => {
    const cart = getCookieCart();
    if (cart[id]) {
        cart[id] += 1;
    } else {
        cart[id] = 1;
    }
    setCookie('cart', JSON.stringify(cart));
}

export const removeProductFromCart = (id: string) => {
    const cart = getCookieCart();
    if (cart[id]) {
        delete cart[id];
    }
    setCookie('cart', JSON.stringify(cart));
}

export const removeSingleItemFromCart = (id: string) => {
    const cart = getCookieCart();
    if (cart[id]) {
        cart[id] -= 1;
        if (cart[id] === 0) {
            delete cart[id];
        }
    }
    setCookie('cart', JSON.stringify(cart));
}