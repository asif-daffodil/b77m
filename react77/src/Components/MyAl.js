import React from 'react';
import MyAlImg from './MyAlImg'

const MyAl = () => {
    return (
    <div className="w-full min-h-screen flex bg-gradient-to-tr from-slate-900 via-slate-50 to-slate-900">
      <div className="App-header w-full sm:max-w-md m-auto text-center">
        <MyAlImg />
        <p className="text-2xl md:text-4xl">Bangladesh Awami League</p>
        <a
          className="text-xl md:text-2xl text-teal-700"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Joy Bangla
        </a>
      </div>
    </div>
    );
};

export default MyAl;