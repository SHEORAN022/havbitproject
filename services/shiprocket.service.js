const axios = require("axios");

const SHIPROCKET_BASE_URL = process.env.SHIPROCKET_BASE_URL;

const shiprocketLogin = async () => {
  const response = await axios.post(
    `${SHIPROCKET_BASE_URL}/auth/login`,
    {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    }
  );

  return response.data.token;
};

module.exports = { shiprocketLogin };
