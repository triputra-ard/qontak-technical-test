export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let response = {};
  if (Object.hasOwn(body, "passkey")) {
    //if the request has passkey for admin
    if (body.passkey === "qontak4dminAccess") {
      const hasAdmin: InfResponseStandardUser = {
        username: body.username,
        role: "admin",
        id: Date.now(),
      };
      response = hasAdmin;
    } else {
      throw createError({
        statusCode: 401,
        message: "Invalid passkey",
        stack: undefined,
      });
    }
  } else {
    const onlyUser: InfResponseStandardUser = {
      username: body.username,
      role: "user",
      id: Date.now(),
    };
    response = onlyUser;
  }
  return {
    data: response,
    success: true,
    message: "User authenticated successfully",
  };
});
