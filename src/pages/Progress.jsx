import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Progress.jsx
 * - localStorage key: "workoutLogs"
 * - Each log: { id, exercise, sets, reps, weight, date }  (date ISO yyyy-mm-dd)
 */

const STORAGE_KEY = "workoutLogs";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatDateISO(date) {
  // returns YYYY-MM-DD
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

function getLastNDates(n) {
  const dates = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(formatDateISO(d));
  }
  return dates;
}

function computeDailyTotals(logs) {
  // total weight lifted per log = sets * reps * weight
  const totals = {};
  logs.forEach((log) => {
    const key = log.date;
    const qty = Number(log.sets) * Number(log.reps) * Number(log.weight || 0);
    totals[key] = (totals[key] || 0) + (Number.isFinite(qty) ? qty : 0);
  });
  return totals; // { '2025-10-21': 1234, ... }
}

export default function Progress() {
  const [logs, setLogs] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(formatDateISO(new Date()));
  const [filterDate, setFilterDate] = useState(""); // optional filter

  // load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLogs(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to read workout logs:", e);
    }
  }, []);

  // persist logs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch (e) {
      console.error("Failed to save workout logs:", e);
    }
  }, [logs]);

  const addLog = (e) => {
    e.preventDefault();
    if (!exercise.trim() || !sets || !reps) {
      alert("Please enter exercise name, sets and reps.");
      return;
    }
    const newLog = {
      id: uid(),
      exercise: exercise.trim(),
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight || 0),
      date: formatDateISO(date),
    };
    setLogs((prev) => [newLog, ...prev]);
    // clear inputs
    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
    setDate(formatDateISO(new Date()));
  };

  const removeLog = (id) => {
    if (!confirm("Delete this log entry?")) return;
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const groupedByDate = useMemo(() => {
    const map = {};
    logs.forEach((l) => {
      if (!map[l.date]) map[l.date] = [];
      map[l.date].push(l);
    });
    // sort dates desc
    const sortedDates = Object.keys(map).sort((a, b) => (a < b ? 1 : -1));
    return { map, sortedDates };
  }, [logs]);

  // chart data for last 7 days
  const chartDates = getLastNDates(7);
  const dailyTotals = useMemo(() => computeDailyTotals(logs), [logs]);
  const chartData = chartDates.map((d) => ({
    date: d,
    total: dailyTotals[d] || 0,
  }));

  // filtered logs (if filterDate applied)
  const visibleLogs = filterDate ? logs.filter((l) => l.date === filterDate) : logs;

  return (
    <div className="min-h-screen bg-[#E0F7FA] p-6 text-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">📈 Progress & Workout History</h1>
          <Link to="/dashboard" className="bg-white px-4 py-2 rounded-lg shadow">
            ← Dashboard
          </Link>
        </div>

        {/* Top: Add new log form */}
        <div className="bg-white rounded-2xl p-5 shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Log a workout</h2>
          <form onSubmit={addLog} className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              placeholder="Exercise (e.g. Push-up)"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="p-2 border rounded-md md:col-span-2"
            />
            <input
              placeholder="Sets"
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="p-2 border rounded-md"
              min="1"
            />
            <input
              placeholder="Reps"
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="p-2 border rounded-md"
              min="1"
            />
            <input
              placeholder="Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="p-2 border rounded-md"
              min="0"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded-md"
            />
            <div className="md:col-span-5 flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setExercise("");
                  setSets("");
                  setReps("");
                  setWeight("");
                  setDate(formatDateISO(new Date()));
                }}
                className="bg-gray-100 px-4 py-2 rounded-md"
              >
                Clear
              </button>
              <div className="ml-auto flex items-center gap-2">
                <label className="text-sm">Filter date:</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="p-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setFilterDate("")}
                  className="bg-gray-100 px-3 py-2 rounded-md"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Middle: Chart */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold mb-3">Last 7 days — Total weight lifted</h3>

            {/* Simple responsive bar chart using SVG */}
            <div className="w-full h-48">
              <svg viewBox="0 0 700 200" preserveAspectRatio="none" className="w-full h-full">
                {/* compute max */}
                {(() => {
                  const max = Math.max(...chartData.map((d) => d.total), 1);
                  return chartData.map((d, i) => {
                    const barWidth = 700 / chartData.length;
                    const x = i * barWidth + 10;
                    const height = (d.total / max) * 140;
                    const y = 180 - height;
                    return (
                      <g key={d.date}>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth - 20}
                          height={height}
                          rx="6"
                          ry="6"
                          fill="#06b6d4"
                        />
                        <text x={x + (barWidth - 20) / 2} y={195} fontSize="10" textAnchor="middle" fill="#334155">
                          {d.date.slice(5)}
                        </text>
                        <text x={x + (barWidth - 20) / 2} y={y - 6} fontSize="11" textAnchor="middle" fill="#0f172a">
                          {Math.round(d.total)}
                        </text>
                      </g>
                    );
                  });
                })()}
              </svg>
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-white rounded-2xl p-4 shadow">
            <h3 className="font-semibold mb-3">Quick Summary</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 rounded-md bg-gray-50">
                <div className="text-sm text-gray-500">Total workouts logged</div>
                <div className="text-xl font-bold">{logs.length}</div>
              </div>
              <div className="p-3 rounded-md bg-gray-50">
                <div className="text-sm text-gray-500">Total weight lifted (all time)</div>
                <div className="text-xl font-bold">
                  {(() => {
                    const totals = logs.reduce((acc, l) => acc + Number(l.sets) * Number(l.reps) * Number(l.weight || 0), 0);
                    return Math.round(totals);
                  })()}
                  {" "}kg
                </div>
              </div>
              <div className="p-3 rounded-md bg-gray-50">
                <div className="text-sm text-gray-500">Avg weight per workout</div>
                <div className="text-xl font-bold">
                  {(() => {
                    if (!logs.length) return 0;
                    const totals = logs.reduce((acc, l) => acc + Number(l.sets) * Number(l.reps) * Number(l.weight || 0), 0);
                    return Math.round(totals / logs.length);
                  })()}
                  {" "}kg
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Workout history table */}
        <div className="bg-white rounded-2xl p-4 shadow mb-12">
          <h3 className="font-semibold mb-3">Workout History</h3>
          {visibleLogs.length === 0 ? (
            <p className="text-gray-600">No workout logs yet. Add one above to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th className="px-3 py-2">Date</th>
                    <th className="px-3 py-2">Exercise</th>
                    <th className="px-3 py-2">Sets</th>
                    <th className="px-3 py-2">Reps</th>
                    <th className="px-3 py-2">Weight (kg)</th>
                    <th className="px-3 py-2">Total</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleLogs.map((l) => (
                    <tr key={l.id} className="border-t">
                      <td className="px-3 py-2 align-top">{l.date}</td>
                      <td className="px-3 py-2">{l.exercise}</td>
                      <td className="px-3 py-2">{l.sets}</td>
                      <td className="px-3 py-2">{l.reps}</td>
                      <td className="px-3 py-2">{l.weight}</td>
                      <td className="px-3 py-2">{Number(l.sets) * Number(l.reps) * Number(l.weight || 0)}</td>
                      <td className="px-3 py-2">
                        <button
                          onClick={() => removeLog(l.id)}
                          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* small footer */}
        <div className="text-center text-sm text-gray-600 mb-8">
          Tip: You can export logs by copying the page data, or we can add CSV export if you want.
        </div>
      </div>
    </div>
  );
}

