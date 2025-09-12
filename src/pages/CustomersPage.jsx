import React from 'react';
import CustomerList from '../components/CustomerList';
import AddCustomer from '../components/AddCustomer';

export default function CustomersPage(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2"><CustomerList /></div>
      <div><AddCustomer /></div>
    </div>
  );
}
