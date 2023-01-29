import Colors from './components/Colors';
import Values from './components/Values';
import Logo from './components/Logo';
import Name from './components/Name';
import './Home.style.less'
import {useState} from "react";

const Home = () => {
  return (
    <div className={`home container h-full flex flex-row`}>
      <div className={'colors__container w-3/5'}>
        <div className={'colors__wrapper colors__container--tw'}>
          <Colors/>
        </div>
      </div>
      <div className={'values__container flex-1  mt-6'}>values</div>
    </div>
  );
};

export default Home;


/**
 *
 *
 *   <div className={`flex-1 overflow-y-auto colors`}>
 *         <Colors />
 *       </div>
 *       <div className={`flex h-12 border-black border-b items-center px-6`}>
 *         <Values />
 *         <Name />
 *         <Logo />
 *       </div>
 *
 *
 */