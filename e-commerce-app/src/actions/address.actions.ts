
"use server";

import { getMyToken } from "@/utilities";

const API_URL = "https://ecommerce.routemisr.com/api/v1/addresses";

export type AddressInput = {
  name: string;
  details: string;
  phone: string;
  city: string;
};

export type AddressApi = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

type ApiResponse = {
  message?: string;
  data?: AddressApi[] | { data?: AddressApi[] };
};

export async function getUserAddresses() {
  try {
    const token = await getMyToken();

    if (!token) {
      return { success: false, data: [], message: "Please login first" };
    }

    const res = await fetch(API_URL, {
      headers: {
        token: token as string,
      },
      cache: "no-store",
    });

    const result: ApiResponse = await res.json();

    if (!res.ok) {
      return {
        success: false,
        data: [],
        message: result.message || "Failed to get addresses",
      };
    }

    const addresses = Array.isArray(result.data)
      ? result.data
      : result.data?.data ?? [];

    return {
      success: true,
      data: addresses,
    };
  } catch {
    return {
      success: false,
      data: [],
      message: "Something went wrong while getting addresses",
    };
  }
}

export async function addUserAddress(address: AddressInput) {
  try {
    const token = await getMyToken();

    if (!token) {
      return { success: false, message: "Please login first" };
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to add address",
      };
    }

    return {
      success: true,
      message: result.message || "Address added successfully",
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while adding address",
    };
  }
}

export async function deleteUserAddress(addressId: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      return { success: false, message: "Please login first" };
    }

    const res = await fetch(`${API_URL}/${addressId}`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to delete address",
      };
    }

    return {
      success: true,
      message: result.message || "Address deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while deleting address",
    };
  }
}
