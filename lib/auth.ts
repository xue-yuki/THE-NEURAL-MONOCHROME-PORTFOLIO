import { jwtVerify, SignJWT } from "jose";

// Need a secure key. We can use ADMIN_PASSWORD as the secret key.
const getJwtSecretKey = () => {
    const secret = process.env.ADMIN_PASSWORD;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable ADMIN_PASSWORD is not set.");
    }
    return secret;
};

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(getJwtSecretKey())
        );
        return verified.payload;
    } catch (err) {
        throw new Error("Your token is expired or invalid.");
    }
};

export const createToken = async () => {
    // Generate a token for the admin session lasting 7 days
    const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(new TextEncoder().encode(getJwtSecretKey()));

    return token;
};
