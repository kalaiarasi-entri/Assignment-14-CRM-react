import React, { useState } from 'react';
import { addCustomer } from '../api/customerApi';

export default function AddCustomer(){
  const [customerName, setCustomerName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [status, setStatus] = useState(1);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCustomer({ customerName, contactInfo, status });
      setMsg('Customer added');
      setCustomerName(''); setContactInfo(''); setStatus(1);
      window.location.reload();
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Add Customer</h3>
      {msg && <div className="text-sm text-green-500 mb-2">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="Customer name" required />
        <input className="input" value={contactInfo} onChange={e=>setContactInfo(e.target.value)} placeholder="Contact info" required />
        <select className="input" value={status} onChange={e=>setStatus(+e.target.value)}>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
        <div className="flex justify-end">
          <button className="btn bg-blue-600">Add</button>
        </div>
      </form>
    </div>
  );
}
