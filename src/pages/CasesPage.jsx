import React from 'react';
import CaseList from '../components/CaseList';
import AddCase from '../components/AddCase';

export default function CasesPage(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2"><CaseList /></div>
      <div><AddCase /></div>
    </div>
  );
}
