import create from 'zustand';

export const useStore = create((set, get) => ({
    currentUser: null,
    setCurrentUser: (user) => set((state) => ({ currentUser: user })),
    products: [],
    setProducts: (products) => set((state) => ({ products: products })),
    updateQuantity: async (e, order, loggedUser,itemId) => {
        const quantity = document.querySelector(
            `select#cart${order.Item?.title}Quantity`
        );
        const stringifiedUser = await fetch(
            `http://localhost:3009/update-quantity`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify({
                    //@ts-ignore
                    quantity: order?+quantity.value:get().currentUser.itemsOrdered.find(order=>order.itemId===itemId).quantity+1,
                    itemId: order?order.Item?.id:itemId,
                    userId: loggedUser.id,
                }),
            }
        );
        const parsedUser = await stringifiedUser.json();
        set({ currentUser: parsedUser });
    },
}));
