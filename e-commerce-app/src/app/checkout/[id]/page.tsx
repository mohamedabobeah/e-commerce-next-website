"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { checkoutSchema, checkoutSchemaType } from "@/Schemas/checkout.schema";
import { onlinePayment } from "@/actions/checkout.action";
import { createCashOrder } from "@/actions/orders.actions";
import { getUserAddresses, type AddressApi } from "@/actions/address.actions";
import { CartContext } from "@/context/CartContext";
import PaymentMethodSelector, {
  PaymentMethod,
} from "@/app/_components/PaymentMethodSelector/PaymentMethodSelector";
import AddressSelector from "@/app/_components/AddressSelector/AddressSelector";

const fields: {
  name: keyof checkoutSchemaType;
  label: string;
  type: string;
  placeholder: string;
}[] = [
  { name: "details", label: "Details:", type: "text", placeholder: "Enter Your Details..." },
  { name: "phone", label: "Phone:", type: "tel", placeholder: "Enter Your Phone..." },
  { name: "city", label: "City:", type: "text", placeholder: "Enter Your City..." },
];

export default function Checkout() {
  // the id in the url is the cart id
  const { id }: { id: string } = useParams();

  const router = useRouter();
  const { getUserCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  // saved addresses
  const [addresses, setAddresses] = useState<AddressApi[]>([]);
  const [selectedId, setSelectedId] = useState("new"); // an address id, or "new"
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  // choose an address: fill the form with it (or empty it for a new address)
  function selectAddress(addressId: string, list: AddressApi[] = addresses) {
    setSelectedId(addressId);

    const address = list.find((item) => item._id === addressId);

    reset({
      details: address?.details ?? "",
      phone: address?.phone ?? "",
      city: address?.city ?? "",
    });
  }

  // load the saved addresses and select the first one
  useEffect(() => {
    async function loadAddresses() {
      const result = await getUserAddresses();

      if (result.success && result.data.length > 0) {
        setAddresses(result.data);
        setSelectedId(result.data[0]._id);

        reset({
          details: result.data[0].details,
          phone: result.data[0].phone,
          city: result.data[0].city,
        });
      }

      setLoadingAddresses(false);
    }

    loadAddresses();
  }, [reset]);

  async function mySubmit(data: checkoutSchemaType) {
    try {
      // Cash on delivery: create the order, then show it in My Orders
      if (paymentMethod === "cash") {
        const res = await createCashOrder(id, data);

        if (res.status === "success") {
          toast.success("Your order has been placed", {
            position: "top-center",
            duration: 2000,
          });

          // the cart is empty now => refresh the number above the cart icon
          await getUserCart();
          router.push("/allorders");
        } else {
          toast.error(res.message ?? "Could not place the order", {
            position: "top-center",
            duration: 2000,
          });
        }

        return;
      }

      // Online payment: go to the payment page
      const res = await onlinePayment(id, window.location.origin, data);

      if (res.status === "success") {
        window.location.href = res.session.url;
      } else {
        toast.error(res.message ?? "Could not start the payment", {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log("Checkout Error:", error);

      toast.error("Something went wrong, please try again", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  // the inputs are shown when there is no saved address or "different address" is chosen
  const showFields = addresses.length === 0 || selectedId === "new";

  return (
    <div className="mx-auto my-8 w-[90%] max-w-2xl p-4">
      <h1 className="mb-6 text-center text-4xl font-bold text-[#16A34A]">
        Checkout
      </h1>

      <form onSubmit={handleSubmit(mySubmit)} className="flex flex-col gap-4">
        {loadingAddresses ? (
          <div className="h-24 animate-pulse rounded-lg border border-gray-200 bg-gray-50" />
        ) : (
          addresses.length > 0 && (
            <AddressSelector
              addresses={addresses}
              selectedId={selectedId}
              onSelect={(addressId) => selectAddress(addressId)}
            />
          )
        )}

        {!loadingAddresses &&
          showFields &&
          fields.map((item) => (
            <Controller
              key={item.name}
              name={item.name}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={`${item.name}Input`}
                    className="text-[#16A34A]!"
                  >
                    {item.label}
                  </FieldLabel>
                  <Input
                    {...field}
                    type={item.type}
                    id={`${item.name}Input`}
                    aria-invalid={fieldState.invalid}
                    placeholder={item.placeholder}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}

        <PaymentMethodSelector
          value={paymentMethod}
          onChange={setPaymentMethod}
        />

        <button
          type="submit"
          disabled={isSubmitting || loadingAddresses}
          className="my-4 w-full cursor-pointer rounded-md bg-[#16A34A] p-4 text-lg font-bold text-white transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Processing..."
            : paymentMethod === "cash"
              ? "Place Order"
              : "Pay Now"}
        </button>
      </form>
    </div>
  );
}