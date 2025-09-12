import React, { useEffect, useState } from 'react';
import { addCase } from '../api/caseApi';
import { getCustomers } from '../api/customerApi';

export default function AddCase(){
  const [caseName, setCaseName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState(1);
  const [customerId, setCustomerId] = useState('');
  const [customers, setCustomers] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(()=>{ loadCustomers(); }, []);

  const loadCustomers = async () => {
    const res = await getCustomers();
    setCustomers(res.data || []);
    if(res.data && res.data[0]) setCustomerId(res.data[0]._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCase({ caseName, customerId, priority, status });
      setMsg('Case added');
      setCaseName(''); setPriority('Low'); setStatus(1);
      window.location.reload();
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Add Case</h3>
      {msg && <div className="text-sm text-green-500 mb-2">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" value={caseName} onChange={e=>setCaseName(e.target.value)} placeholder="Case name" required />
        <select className="input" value={priority} onChange={e=>setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select className="input" value={status} onChange={e=>setStatus(+e.target.value)}>
          <option value={1}>Open</option>
          <option value={0}>Closed</option>
        </select>
        <select className="input" value={customerId} onChange={e=>setCustomerId(e.target.value)}>
          {customers.map(c => <option key={c._id} value={c._id}>{c.customerName}</option>)}
        </select>
        <div className="flex justify-end">
          <button className="btn bg-blue-600">Add Case</button>
        </div>
      </form>
    </div>
  );
}
