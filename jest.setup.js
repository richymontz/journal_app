// // En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import { getEnvironments } from './config';

require('dotenv').config({
  path: '.env.test'
});

jest.mock('./config', () => ({
  getEnvironments: () => ({ ...process.env })
}));