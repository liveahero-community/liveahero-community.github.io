// Node modules.
import { includes } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { getUserLocale } from 'get-user-locale';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
// Local modules.
import { Language } from './models/System';
import * as Config from './configs/index';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

// TODO: workaround for now.
const userLocale = getUserLocale();
const language = includes(['ja-JP', 'zh-TW', 'en-US'] as Language[], userLocale)
  ? userLocale as Language
  : 'en-US' as Language;

ReactDOM.render(
  <>
    <Helmet>
      <meta charSet='utf-8' />
      <title>{Config.websiteTitle[language]}</title>
      <link rel='canonical' href={Config.publicUrl} />
      <meta name='description' content={Config.websiteDescription[language]} />
    </Helmet>

    <App />

    <ToastContainer
      position='bottom-center'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={3}
    />
  </>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
