import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer, updateCustomer } from '../api/customerApi';

export default function CustomerList(){
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState('');
  const [editContact, setEditContact] = useState('');

  const fetch = async () => {
    setLoading(true);
    const res = await getCustomers();
    setCustomers(res.data || []);
    setLoading(false);
  }

  useEffect(()=>{ fetch(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete customer?')) return;
    await deleteCustomer(id);
    fetch();
  };

  const startEdit = (c) => {
    setEditing(c._id);
    setEditName(c.customerName);
    setEditContact(c.contactInfo);
  };

  const saveEdit = async (id) => {
    await updateCustomer(id, { customerName: editName, contactInfo: editContact, status: 1 });
    setEditing(null);
    fetch();
  };

  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Customers</h3>
      {loading ? <div>Loading...</div> :
        <ul className="space-y-3">
          {customers.map(c=>(
            <li key={c._id} className="p-3 border rounded flex justify-between items-start">
              <div className="flex-1">
                {editing === c._id ? (
                  <div className="space-y-2">
                    <input className="input" value={editName} onChange={e=>setEditName(e.target.value)} />
                    <input className="input" value={editContact} onChange={e=>setEditContact(e.target.value)} />
                    <div className="flex gap-2">
                      <button className="btn bg-green-600" onClick={()=>saveEdit(c._id)}>Save</button>
                      <button className="btn bg-gray-600" onClick={()=>setEditing(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium">{c.customerName} <span className="text-sm text-zinc-400">({c.status===1?'Active':'Inactive'})</span></div>
                    <div className="text-sm small">{c.contactInfo}</div>
                  </div>
                )}
              </div>
              <div className="space-x-2 ml-4">
                <button className="px-2 py-1 bg-yellow-500 text-black rounded" onClick={()=>startEdit(c)}>Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={()=>handleDelete(c._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
