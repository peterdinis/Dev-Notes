"use client";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";
import type { FC, ReactNode } from "react";

type AuthProviderProps = {
    children?: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({children}: AuthProviderProps) => {
  return <KindeProvider>{children}</KindeProvider>;
};