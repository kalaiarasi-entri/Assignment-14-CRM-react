import React, { useEffect, useState } from 'react';
import { getCases, deleteCase, updateCase } from '../api/caseApi';
import { getCustomers } from '../api/customerApi';

export default function CaseList(){
  const [cases, setCases] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPriority, setEditPriority] = useState('Low');
  const [editStatus, setEditStatus] = useState(1);
  const [editCustomer, setEditCustomer] = useState('');

  const fetch = async () => {
    setLoading(true);
    const res = await getCases();
    setCases(res.data || []);
    const c = await getCustomers();
    setCustomers(c.data || []);
    setLoading(false);
  }

  useEffect(()=>{ fetch(); }, []);

  const handleDelete = async (id) => {
    if(!confirm('Delete case?')) return;
    await deleteCase(id);
    fetch();
  };

  const startEdit = (k) => {
    setEditing(k._id);
    setEditName(k.caseName);
    setEditPriority(k.priority);
    setEditStatus(k.status);
    setEditCustomer(k.customerId || (k.customer && k.customer._id) || '');
  };

  const saveEdit = async (id) => {
    await updateCase(id, { caseName: editName, priority: editPriority, status: editStatus, customerId: editCustomer });
    setEditing(null);
    fetch();
  };

  const getCustomerName = (id) => {
    const found = customers.find(c=>c._id === id);
    return found ? found.customerName : '—';
  };

  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Cases</h3>
      {loading ? <div>Loading...</div> :
        <ul className="space-y-3">
          {cases.map(k=>(
            <li key={k._id} className="p-3 border rounded flex justify-between items-start">
              <div className="flex-1">
                {editing === k._id ? (
                  <div className="space-y-2">
                    <input className="input" value={editName} onChange={e=>setEditName(e.target.value)} />
                    <select className="input" value={editPriority} onChange={e=>setEditPriority(e.target.value)}>
                      <option>Low</option><option>Medium</option><option>High</option>
                    </select>
                    <select className="input" value={editStatus} onChange={e=>setEditStatus(+e.target.value)}>
                      <option value={1}>Open</option><option value={0}>Closed</option>
                    </select>
                    <select className="input" value={editCustomer} onChange={e=>setEditCustomer(e.target.value)}>
                      {customers.map(c => <option key={c._id} value={c._id}>{c.customerName}</option>)}
                    </select>
                    <div className="flex gap-2">
                      <button className="btn bg-green-600" onClick={()=>saveEdit(k._id)}>Save</button>
                      <button className="btn bg-gray-600" onClick={()=>setEditing(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium">{k.caseName} <span className="text-sm text-zinc-400">({k.priority})</span></div>
                    <div className="text-sm small">Customer: {getCustomerName(k.customerId || (k.customer && k.customer._id))}</div>
                    <div className="text-xs small">Created: {k.createdAt ? new Date(k.createdAt).toLocaleString() : '—'}</div>
                  </div>
                )}
              </div>
              <div className="space-x-2 ml-4">
                <button className="px-2 py-1 bg-yellow-500 text-black rounded" onClick={()=>startEdit(k)}>Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={()=>handleDelete(k._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
