
"use server";

const API_URL = "https://ecommerce.routemisr.com/api/v1/auth";

interface PasswordResult {
  success: boolean;
  message: string;
}

// 1) send the reset code to the email
export async function forgotPassword(email: string): Promise<PasswordResult> {
  try {
    const res = await fetch(`${API_URL}/forgotPasswords`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to send reset code",
      };
    }

    return {
      success: true,
      message: result.message || "Reset code sent to your email",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// 2) check the code
export async function verifyResetCode(
  resetCode: string
): Promise<PasswordResult> {
  try {
    const res = await fetch(`${API_URL}/verifyResetCode`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ resetCode }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Reset code is invalid or has expired",
      };
    }

    return { success: true, message: "Code verified successfully" };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// 3) set the new password
export async function resetPassword(
  email: string,
  newPassword: string
): Promise<PasswordResult> {
  try {
    const res = await fetch(`${API_URL}/resetPassword`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to change the password",
      };
    }

    return { success: true, message: "Password changed successfully" };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}