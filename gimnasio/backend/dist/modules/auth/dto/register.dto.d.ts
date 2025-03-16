export declare enum Role {
    CLIENT = "CLIENT",
    TRAINER = "TRAINER",
    ADMIN = "ADMIN"
}
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: Role;
}
