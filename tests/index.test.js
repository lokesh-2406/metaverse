const axios_og = require("axios");

const axios = {
    post: async (...args) => {
        try {
            const response = await axios_og.post(...args);
            return response;
        } catch (error) {
            // console.error("Error in POST request:", error);
            return error.response;
        }
    },
    get: async (...args) => {
        try {
            const response = await axios_og.get(...args);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    put: async (...args) => {
        try {
            const response = await axios_og.put(...args);
            return response;
        } catch (error) {
            return error.response;
        }
    },
    delete: async (...args) => {
        try {
            const response = await axios_og.delete(...args);
            return response;
        } catch (error) {
            return error.response;
        }
    },
};
const username1 = "Lokidad" + Math.floor(Math.random() * 1000);
const BASE_URL = "http://localhost:3000";
const WS_URL = "ws://localhost:3001";
describe("Authenticate ", () => {
    test("User is able to sign up only once", async () => {
        //const username = "Lokidad" + Math.floor(Math.random() * 1000);
        const password = "password123";
        const response = await axios.post(`${BASE_URL}/api/v1/signup`, {
            username: username1,
            password,
            role: "admin",
        });
        console.log(response.data);
        expect(response.status).toBe(200);
        const response2 = await axios.post(`${BASE_URL}/api/v1/signup`, {
            username: username1,
            password,
            role: "admin",
        });

        expect(response2.status).toBe(400);
    });
    test("Username empty, signup fails", async () => {
        const username = " abc";

        const password = "password123";
        const response = await axios.post(`${BASE_URL}/api/v1/signup`, {
            password,
            role: "admin",
        });
        expect(response.status).toBe(400);
    });
    test("Signin passes with correct credentials", async () => {
        //const username = "Lokidad" + Math.floor(Math.random() * 1000);
        const password = "password123";
        await axios.post(`${BASE_URL}/api/v1/signup`, {
            username: username1,
            password,
            role: "admin",
        });
        const response = await axios.post(`${BASE_URL}/api/v1/signin`, {
            username: username1,
            password,
        });
        // console.log(response.data);
        expect(response.status).toBe(200);
        expect(response.data.token).toBeDefined();
    });
    test("Signin fails with wrong credentials", async () => {
        const username = "Lokidadi" + Math.floor(Math.random() * 1000);
        const password = "password123";
        await axios.post(`${BASE_URL}/api/v1/signup`, {
            username,
            password,
            role: "admin",
        });
        try {
            await axios.post(`${BASE_URL}/api/v1/signin`, {
                username,
                password: "wrongpassword",
            });
        } catch (error) {
            expect(error.response.status).toBe(403);
        }
    });
});

// describe("WebSockets test", () => {
//     let adminToken;
//     let userToken;
//     let adminId;
//     let userId;
//     let spaceId;
//     let mapId;
//     let element1Id;
//     let element2Id;
//     let ws1;
//     let ws2;
//     let ws1messages = [];
//     let ws2messages = [];
//     let adminX;
//     let userX;
//     let adminY;
//     let userY;

//     function waitForandPopLastMessage(wsMessages) {
//         return new Promise((resolve) => {
//             if (wsMessages.length > 0) {
//                 resolve(wsMessages.shift());
//             } else {
//                 let timeout = setTimeout(() => {
//                     if (wsMessages.length > 0) {
//                         resolve(wsMessages.shift());
//                         clearInterval(interval);
//                     }
//                 }, 100);
//             }
//         });
//     }

//     async function setupHTTP() {
//         //signup , signin ,
//         const username = "Lokidada" + Math.floor(Math.random() * 1000);
//         const password = "password123";
//         const adminSignupResponse = await axios.post(
//             `${BASE_URL}/api/v1/signup`,
//             {
//                 username,
//                 password,
//                 type: "admin",
//             }
//         );
//         const adminSigninResponse = await axios.post(
//             `${BASE_URL}/api/v1/signin`,
//             {
//                 username,
//                 password,
//             }
//         );
//         adminToken = adminSigninResponse.data.token;

//         adminId = adminSigninResponse.data.userId;
//         const userSignupResponse = await axios.post(
//             `${BASE_URL}/api/v1/signup`,
//             {
//                 username: username + "user",
//                 password,
//                 type: "user",
//             }
//         );
//         const userSigninResponse = await axios.post(
//             `${BASE_URL}/api/v1/signin`,
//             {
//                 username: username + "user",
//                 password,
//                 // Setup code to initialize WebSocket server if needed
//             }
//         );
//         userToken = userSigninResponse.data.token;
//         userId = userSigninResponse.data.userId;

//         const element1Response = await axios.post(
//             `${BASE_URL}/api/v1/element`,
//             {
//                 imageUrl:
//                     "data:image/jpeg;base64,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",
//                 width: 1,
//                 height: 1,
//                 statice: true,
//             },
//             {
//                 headers: { Authorization: `Bearer ${adminToken}` },
//             }
//         );
//         const element2Response = await axios.post(
//             `${BASE_URL}/api/v1/element`,
//             {
//                 imageUrl:
//                     "data:image/jpeg;base64,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",
//                 width: 2,
//                 height: 1,
//                 statice: true,
//             },
//             {
//                 headers: { Authorization: `Bearer ${adminToken}` },
//             }
//         );
//         element1Id = element1Response.data.id;
//         element2Id = element2Response.data.id;
//         // Create a map
//         const mapResponse = await axios.post(
//             `${BASE_URL}/api/v1/maps`,
//             {
//                 thumbnail:
//                     "data:image/jpeg;base64,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",
//                 dimensions: "100x200",
//                 defaultElements: [
//                     { elementId: element1Id, x: 10, y: 20 },
//                     { elementId: element1Id, x: 10, y: 19 },
//                     { elementId: element2Id, x: 30, y: 40 },
//                 ],
//             },
//             {
//                 headers: { Authorization: `Bearer ${adminToken}` },
//             }
//         );
//         mapId = mapResponse.data.id;
//         const spaceResponse = await axios.post(
//             `${BASE_URL}/api/v1/spaces`,
//             {
//                 name: "Test Space",
//                 dimensions: "100x200",
//                 mapId,
//             },
//             {
//                 headers: { Authorization: `Bearer ${adminToken}` },
//             }
//         );
//         spaceId = spaceResponse.data.id;
//     }
//     async function setupWS() {
//         const w1 = new WebSocket(WS_URL);

//         await new Promise((r) => {
//             w1.onopen = r;
//         });

//         ws1.onmessage = (event) => {
//             ws1mesaages.push(JSON.parse(event.data));
//         };
//         const w2 = new WebSocket(WS_URL);
//         await new Promise((r) => {
//             w2.onopen = r;
//         });
//         ws2.onmessage = (event) => {
//             ws2mesaages.push(JSON.parse(event.data));
//         };
//     }

//     beforeAll(async () => {
//         setupHTTP();
//         setupWS();
//     });
//     test("get back ack for joiing the space", async () => {
//         ws1.send(
//             JSON.stringify({
//                 type: "joinSpace",
//                 payload: {
//                     spaceId: spaceId,
//                     token: adminToken,
//                 },
//             })
//         );
//         const message1 = await waitForandPopLastMessage(ws1mesaages);
//         ws2.send(
//             JSON.stringify({
//                 type: "joinSpace",
//                 payload: {
//                     spaceId: spaceId,
//                     token: userToken,
//                 },
//             })
//         );

//         const message2 = await waitForandPopLastMessage(ws2mesaages);
//         const message3= await waitForandPopLastMessage(ws1mesaages);
//         expect(message1.type).toBe("space-joined");
//         expect(message2.type).toBe("space-joined");
//         expect(
//             message1.payload.users.length
//         ).toBe(0); //no users in the space yet
//         expect(message2.payload.users.length).toBe(1);
//         expect(message3.type).toBe("user-joined");
//         expect(message3.payload.x).toBe(message2.payload.spawn.x);
//         expect(message3.payload.y).toBe(message2.payload.spawn.y);
//         expect(message3.payload.userId).toBe(userId);
//         adminX = message1.payload.spawn.x;
//         adminY = message1.payload.spawn.y;

//         userX = message2.payload.spawn.x;
//         userY = message2.payload.spawn.y;
//     });

//     test("User should not be able to move outside the map", async () => {
//         ws1.send(
//             JSON.stringify({
//                 type: "movement",
//                 payload: {
//                     x: 100000,
//                     y: 200000,
//                 },
//             })
//         );
//         const message1 = await waitForandPopLastMessage(ws1mesaages);
//         expect(message1.type).toBe("movement-rejected");
//         expect(message1.payload.x).toBe(AdminX); //return to previous position
//         expect(message1.payload.y).toBe(AdminY);
//     });
//     test("User should not be able to move 2 blocks in one g0", async () => {
//         ws1.send(
//             JSON.stringify({
//                 type: "movement",
//                 payload: {
//                     x: adminX + 2,
//                     y: adminY,
//                 },
//             })
//         );
//         const message1 = await waitForandPopLastMessage(ws1mesaages);
//         expect(message1.type).toBe("movement-rejected");
//         expect(message1.payload.x).toBe(AdminX); //return to previous position
//         expect(message1.payload.y).toBe(AdminY);
//     });
//     test("correct movement shown in the ws2", async () => {
//         ws1.send(
//             JSON.stringify({
//                 type: "movement",
//                 payload: {
//                     x: adminX + 1,
//                     y: adminY,
//                     userId: adminId,
//                 },
//             })
//         );
//         const message1 = await waitForandPopLastMessage(ws2mesaages);
//         expect(message1.type).toBe("movement");
//         expect(message1.payload.x).toBe(AdminX + 1); //return to previous position
//         expect(message1.payload.y).toBe(AdminY);
//     });
//     test("if a user leaves, the other user recieves a leave event", async () => {
//         ws1.close();
//         const message1 = await waitForandPopLastMessage(ws2mesaages);
//         expect(message1.type).toBe("user-left");
//         expect(message1.payload.userId).toBe(AdminId);
//     });
// });
