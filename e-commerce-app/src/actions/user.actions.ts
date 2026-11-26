
"use server";

import { getMyToken } from "@/utilities";

const API_URL = "https://ecommerce.routemisr.com/api/v1/users";

interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
}

interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export async function updateUserData(
  data: UpdateUserData
): Promise<ActionResult> {
  try {
    const token = await getMyToken();

    if (!token) {
      return { success: false, message: "Please login first" };
    }

    const res = await fetch(`${API_URL}/updateMe/`, {
      method: "PUT",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      // validation errors of the api come inside errors.msg
      return {
        success: false,
        message:
          result.errors?.msg ?? result.message ?? "Failed to update account",
      };
    }

    return {
      success: true,
      message: "Your information was updated successfully",
      data: result.user,
    };
  } catch (error) {
    console.log("Update User Error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}