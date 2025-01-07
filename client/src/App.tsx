import React, { useState } from 'react';
import { SumServiceClient } from './proto/SumServiceClientPb';
import { SumRequest } from './proto/sum_pb';
import { grpc } from '@improbable-eng/grpc-web';
import './App.css'; // Import a CSS file for styling

const transport = grpc.CrossBrowserHttpTransport({});
const sumClient = new SumServiceClient('http://localhost:8000', null, { transport });

const App: React.FC = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [response, setResponse] = useState('');

  const handleSum = () => {
    const numA = parseInt(a);
    const numB = parseInt(b);

    if (isNaN(numA) || isNaN(numB)) {
      setResponse('Please enter valid numbers.');
      return;
    }

    const request = new SumRequest();
    request.setA(numA);
    request.setB(numB);

    const metadata = {
      'Content-Type': 'application/grpc-web',
    };

    sumClient.add(request, metadata, (err, res) => {
      if (err) {
        console.error('Error:', err);
        setResponse(`Error: ${err.message}`);
      } else {
        const result = res?.getResult();
        console.log('Backend response:', result);
        setResponse(`Result: ${result}`);
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sum Calculator</h1>
        <p>Enter two numbers to calculate their sum using gRPC-Web</p>
      </header>
      <main>
        <div className="input-container">
          <input
            type="number"
            value={a}
            placeholder="Enter number a"
            onChange={(e) => setA(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            value={b}
            placeholder="Enter number b"
            onChange={(e) => setB(e.target.value)}
            className="input-field"
          />
          <button onClick={handleSum} className="calculate-button">
            Calculate Sum
          </button>
        </div>
        {response && <div className="response">{response}</div>}
      </main>
    </div>
  );
};

export default App;