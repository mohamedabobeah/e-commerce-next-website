export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
  };
}

// the exact field names are confirmed with a console.log of a real order
export interface OrderType {
  _id: string;
  id: number | string; // order number
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "card" | "cash";
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}