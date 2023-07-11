import { useEffect, useRef, useState } from "react";


const App = () =>
{
  const apiKey = '3e92c85806a9346334c93af5bc6d6b4d309d4c94'
  const [ isPaused, setPause ] = useState( false );
  const ws = useRef( null );

  useEffect( () =>
  {
    ws.current = new WebSocket( `ws://127.0.0.1:8000/ws/chat/1/?user=${ apiKey }` );
    ws.current.onopen = () => console.log( "ws opened" );
    ws.current.onclose = () => console.log( "ws closed" );

    const wsCurrent = ws.current;

    return () =>
    {
      wsCurrent.close();
    };
  }, [] );

  useEffect( () =>
  {
    if ( !ws.current ) return;

    ws.current.onmessage = e =>
    {
      if ( isPaused ) return;
      const message = JSON.parse( e.data );
      console.log( "e", message );
    };
  }, [ isPaused ] );

  return (
    <div>
      <button onClick={ () => setPause( !isPaused ) }>
        { isPaused ? "Resume" : "Pause" }
      </button>
    </div>
  );
};

export default App;
