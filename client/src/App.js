import React from 'react';
import './App.css';
import Routes from './container/routing'



class App extends React.Component {
  
    render()
    {
        return (
      
      
          <div className="App">
            <Routes/>
          </div>
        );}
      }
      
      export default App

  //=================//
 // HOOKS PRACTICE //
//================//

// import React, { useState, useEffect,useNetwolk } from 'react';
// import { useNetworkStatus } from 'react-adaptive-hooks/network';
// import dodo from './imgs/dod.jpeg'
// import lady from './imgs/lady.jpg'
// import bh from './imgs/hole.jpg'
// import { useSaveData } from 'react-adaptive-hooks/save-data';
// import { useHardwareConcurrency } from 'react-adaptive-hooks/hardware-concurrency';
// import { useMemoryStatus } from 'react-adaptive-hooks/memory';
// import { useMediaCapabilitiesDecodingInfo } from 'react-adaptive-hooks/media-capabilities';

// function App() {
//   const [count, setCount] = useState(0);

//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     // Update the document title using the browser API
//     document.title = `You clicked ${count} times`;
    
//   });

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <New/>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }

// function New (props){
  
//     const { effectiveConnectionType } = useNetworkStatus();

//     let media;
//     switch(effectiveConnectionType) {
//       case 'slow-2g':
//         media = <img src={bh} width='500px' height='500px' alt='low resolution' />;
//         break;
//       case '2g':
//         media = <img src={lady} width='500px' height='500px' alt='medium resolution' />;
//         break;
//       case '3g':
//         media = <img src={dodo} width='500px' height='500px' alt='high resolution' />;
//         break;
//       case '4g':
//         media = <video muted controls>...</video>;
//         break;
//       default:
//         media = '<video muted controls>...</video>';
//         break;
//     }
    
//     return <div>{media}</div>;
  
// }

