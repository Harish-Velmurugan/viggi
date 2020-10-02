import React from 'react';
import { Toast } from 'react-bootstrap';

export function Confirmation({ toggle }) {
  return (
    <Toast onClose={() => toggle(false)}>
     <center> <Toast.Header>
        <strong className="mr-auto">request sent</strong>
        
      </Toast.Header></center>
      
    </Toast>
  );
}