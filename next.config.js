/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@contentstack/venus-components"]);
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
