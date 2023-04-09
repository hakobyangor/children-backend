
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED"
}

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

export interface CreateDoctorInput {
    firstName: string;
    lastName: string;
    address: string;
    doctorSpecializationId: number;
    avatar?: Nullable<string>;
    lat: number;
    long: number;
}

export interface UpdateDoctorInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    address?: Nullable<string>;
    doctorSpecializationId?: Nullable<number>;
    avatar?: Nullable<string>;
    lat?: Nullable<number>;
    long?: Nullable<number>;
    status?: Nullable<Status>;
}

export interface CreateDoctorSpecializationInput {
    name: string;
    status: Status;
}

export interface UpdateDoctorSpecializationInput {
    name?: Nullable<string>;
    status?: Nullable<Status>;
}

export interface CreateUserInput {
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    password?: Nullable<string>;
    avatar?: Nullable<string>;
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
    createDoctor(createDoctorInput: CreateDoctorInput): Nullable<Doctor> | Promise<Nullable<Doctor>>;
    updateDoctor(id: string, updateDoctorInput: UpdateDoctorInput): Nullable<Doctor> | Promise<Nullable<Doctor>>;
    deleteDoctor(id: string): Nullable<Doctor> | Promise<Nullable<Doctor>>;
    createDoctorSpecialization(createDoctorSpecializationInput: CreateDoctorSpecializationInput): Nullable<DoctorSpecialization> | Promise<Nullable<DoctorSpecialization>>;
    updateDoctorSpecialization(id: string, updateDoctorSpecializationInput: UpdateDoctorSpecializationInput): Nullable<DoctorSpecialization> | Promise<Nullable<DoctorSpecialization>>;
    deleteDoctorSpecialization(id: string): Nullable<DoctorSpecialization> | Promise<Nullable<DoctorSpecialization>>;
    createUser(createUserInput: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export interface Doctor {
    id: string;
    firstName: string;
    lastName: string;
    status?: Nullable<Status>;
    avatar?: Nullable<string>;
    address?: Nullable<string>;
    lat?: Nullable<number>;
    long?: Nullable<number>;
    doctorSpecializationId?: Nullable<number>;
    doctorSpecialization?: Nullable<DoctorSpecialization>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface IQuery {
    doctors(): Doctor[] | Promise<Doctor[]>;
    doctorById(id: string): Nullable<Doctor> | Promise<Nullable<Doctor>>;
    doctorSpecializations(): DoctorSpecialization[] | Promise<DoctorSpecialization[]>;
    doctorSpecializationById(id: string): Nullable<DoctorSpecialization> | Promise<Nullable<DoctorSpecialization>>;
    users(): User[] | Promise<User[]>;
    userById(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface DoctorSpecialization {
    id: string;
    name: string;
    status?: Nullable<Status>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
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

type Nullable<T> = T | null;
