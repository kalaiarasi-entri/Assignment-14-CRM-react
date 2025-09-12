import React from "react";
import { isLogged, getUserFromToken } from "../utils/auth";
import { Link } from "react-router-dom";

export default function Home() {
  const logged = isLogged();
  const user = getUserFromToken();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-6">
      <div className="md:col-span-2 bg-white card ">
        <h2 className="text-xl font-semibold mb-2">Welcome to CRM</h2>
        <p className="small mb-4">
          This app connects to your backend. Only authenticated users (role:
          user) can manage customers and cases.
        </p>

        {!logged && (
          <div>
            <p className="mb-2">
              Please{" "}
              <Link to="/login" className="text-blue-400">
                login
              </Link>{" "}
              or{" "}
              <Link to="/register" className="text-blue-400">
                register
              </Link>{" "}
              to manage customers and cases.
            </p>
          </div>
        )}

        {logged && (
          <div>
            <p className="mb-2">
              Welcome back{user?.email ? `, ${user.email}` : ""}! Use the
              navigation links to manage customers and cases.
            </p>
              <ul className="space-y-2">
            <li>
              <Link to="/customers" className="text-blue-400">
                Manage Customers
              </Link>
            </li>
            <li>
              <Link to="/cases" className="text-blue-400">
                Manage Cases
              </Link>
            </li>
          </ul>
          </div>
        )}
      </div>

      {/* <div className="card">
        <h3 className="font-semibold mb-2">Quick Actions</h3>
        {!logged && <div className="small">Login to see actions</div>}
        {logged && (
          <ul className="space-y-2">
            <li>
              <Link to="/customers" className="text-blue-400">
                Manage Customers
              </Link>
            </li>
            <li>
              <Link to="/cases" className="text-blue-400">
                Manage Cases
              </Link>
            </li>
          </ul>
        )}
      </div> */}
    </div>
  );
}
