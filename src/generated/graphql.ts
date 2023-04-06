
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED",
    PENDING = "PENDING",
    DRAFT = "DRAFT"
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface SignUpInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface ResetPasswordInput {
    hash: string;
    password: string;
}

export interface CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    password?: Nullable<string>;
    status?: Nullable<UserStatus>;
}

export interface AccessToken {
    access_token: string;
}

export interface IMutation {
    login(loginInput: LoginInput): Nullable<AccessToken> | Promise<Nullable<AccessToken>>;
    signUp(signUpInput: SignUpInput): Nullable<User> | Promise<Nullable<User>>;
    resetPasswordEmail(email: string): Nullable<User> | Promise<Nullable<User>>;
    resetPassword(resetPasswordInput: ResetPasswordInput): Nullable<User> | Promise<Nullable<User>>;
    createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: Nullable<UserRole>;
    password?: Nullable<string>;
    status?: Nullable<UserStatus>;
    hash?: Nullable<string>;
    hashExpiredAt?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    userById(id: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
