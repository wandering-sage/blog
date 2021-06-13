import { merge } from 'lodash';
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  port: 8000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d',
  },
};

let envConfig = require('./dev').config;

export default merge(baseConfig, envConfig);
