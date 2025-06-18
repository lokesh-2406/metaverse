const axios = require("axios");

const BASE_URL = "http://localhost:3000";
describe("Authenticate ", () => {
    test("User is able to sign up only once", async () => {
        const username = "Lokidada" + Math.floor(Math.random() * 1000);
        const password = "password123";
        const response = await axios.post(`${BASE_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin",
        });
        expect(response.statusCode).toBe(200);
        const response2 = await axios.post(`${BASE_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin",
        });
        expect(response2.statusCode).toBe(400);
    });
    test("Username empty, signup fails", async () => {
        const username = " abc";

        const password = "password123";
        const response = await axios.post(`${BASE_URL}/api/v1/signup`, {
            password,
            type: "admin",
        });
        expect(response.statusCode).toBe(400);
    });
});

