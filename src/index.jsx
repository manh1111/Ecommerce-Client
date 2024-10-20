import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@contexts/themeContext';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { SearchProductProvider } from '@contexts/searchProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <SearchProductProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SearchProductProvider>
    </ThemeProvider>
  </BrowserRouter>
);
