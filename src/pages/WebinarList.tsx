import { useEffect, useState } from "react";
import api from "../services/api";
import type { Webinar } from "../types/webinar";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function WebinarList() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/webinars")
      .then((res) => setWebinars(res.data.data))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
  return <Loader />;
}

  return (
    <main className="flex-1 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* PAGE INTRO */}
        <div className="mb-14 max-w-2xl">
          <h2 className="text-3xl font-bold text-white">
            Upcoming Webinars
          </h2>
          <p className="mt-3 text-slate-400">
            Attend live, expert-led webinars designed to help you stay ahead in
            technology, development, and modern engineering practices.
          </p>
        </div>


        {/* WEBINAR CARDS */}
        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.map((w) => (
              <div
                key={w._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-white">
                  {w.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {new Date(w.scheduledAt).toLocaleString()}
                </p>

                <p className="mt-4 text-sm text-slate-500">
                  Learn key concepts through structured discussion and
                  real-world use cases in this live session.
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    👥 {w.attendeeCount} registered
                  </span>

                 <Link
  to={`/webinars/${w._id}`}
  className="text-sm font-medium text-blue-500 hover:text-blue-400"
>
  View details →
</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


