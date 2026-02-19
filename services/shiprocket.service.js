const axios = require("axios");

const SHIPROCKET_BASE_URL = process.env.SHIPROCKET_BASE_URL;

const shiprocketLogin = async () => {
  const response = await axios.post(
    `${SHIPROCKET_BASE_URL}/v1/external/auth/login`,
    {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.token;
};

module.exports = { shiprocketLogin };
