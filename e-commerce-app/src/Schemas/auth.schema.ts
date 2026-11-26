import * as zod from "zod";
export const myRegisterSchema = zod
  .object({
    name: zod
      .string()
      .min(1, "name is required")
      .min(3, "min length is 3 chars")
      .max(20, "max length is 20 chars"),

    email: zod.string().min(1, "email is required").email("invalid email"),

    phone: zod
      .string()
      .min(1, "phone is required")
      .regex(/^01[0125][0-9]{8}$/, "invalid phone number"),

    password: zod
      .string()
      .min(1, "password is required")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        "password must be 8-16 characters with no spaces, and contain a number, an uppercase letter, a lowercase letter and a special character"
      ),

    rePassword: zod.string().min(1, "rePassword is required"),
  })
  .refine((object) => object.password === object.rePassword, {
    message: "password & rePassword not matched!",
    path: ["rePassword"],
  });  


  export type RegisterSchemaType = zod.infer<typeof myRegisterSchema>;  






  export const LoginSchema = zod
  .object({
    

    email: zod.string().min(1, "email is required").email("invalid email"),

    

    password: zod
      .string()
      .min(1, "password is required")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        "password must be 8-16 characters with no spaces, and contain a number, an uppercase letter, a lowercase letter and a special character"
      ),

   
  })
  


  export type LoginType = zod.infer<typeof LoginSchema>;  








  // ADD these at the end of src/Schemas/auth.schema.ts
  // (zod is already imported there: import * as zod from "zod")
  
  // Personal information (phone is optional: the api does not return it)
  export const UpdateProfileSchema = zod.object({
    name: zod
      .string()
      .min(1, "name is required")
      .min(3, "min length is 3 chars")
      .max(20, "max length is 20 chars"),
  
    email: zod.string().min(1, "email is required").email("invalid email"),
  
    phone: zod
      .string()
      .regex(/^01[0125][0-9]{8}$/, "invalid phone number")
      .or(zod.literal("")),
  });
  
  export type UpdateProfileType = zod.infer<typeof UpdateProfileSchema>;
  
  // New address
  export const AddressSchema = zod.object({
    name: zod
      .string()
      .min(1, "name is required")
      .min(3, "min length is 3 chars"),
  
    phone: zod
      .string()
      .min(1, "phone is required")
      .regex(/^01[0125][0-9]{8}$/, "invalid phone number"),
  
    city: zod.string().min(1, "city is required"),
  
    details: zod.string().min(1, "address details are required"),
  });
  
  export type AddressType = zod.infer<typeof AddressSchema>;  



  // ADD these at the end of src/Schemas/auth.schema.ts
// (zod is already imported there: import * as zod from "zod")

// Step 1: forgot password
export const ForgotPasswordSchema = zod.object({
  email: zod.string().min(1, "email is required").email("invalid email"),
});

export type ForgotPasswordType = zod.infer<typeof ForgotPasswordSchema>;

// Step 2: verify the code that came to the email
export const VerifyCodeSchema = zod.object({
  resetCode: zod
    .string()
    .min(1, "code is required")
    .regex(/^\d{6}$/, "the code must be 6 digits"),
});

export type VerifyCodeType = zod.infer<typeof VerifyCodeSchema>;

// Step 3: new password (same rule as register)
export const ResetPasswordSchema = zod
  .object({
    newPassword: zod
      .string()
      .min(1, "password is required")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        "password must be 8-16 characters with no spaces, and contain a number, an uppercase letter, a lowercase letter and a special character"
      ),

    rePassword: zod.string().min(1, "rePassword is required"),
  })
  .refine((object) => object.newPassword === object.rePassword, {
    message: "password & rePassword not matched!",
    path: ["rePassword"],
  });

export type ResetPasswordType = zod.infer<typeof ResetPasswordSchema>;