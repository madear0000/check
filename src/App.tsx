import React from 'react';
import Button from './button/button';

function App(): JSX.Element {
  const handleClick = () => {
    console.log("congartulations")
  }
  return (
    <Button isDisabled={true} sizeOfButton='lg' variant='outline' onClick={handleClick}>Click</Button>
  );
}

export default App;
