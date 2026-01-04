import { useEffect, useState } from "react";
import { Calendar, Users, Mail, UserPlus } from "lucide-react";
import api from "../services/api";
import type { Webinar, Attendee } from "../types/webinar";
import { useParams } from "react-router-dom";
import { toast } from "sonner";


export default function WebinarDetail() {
  const { id: webinarId } = useParams<{ id: string }>();

  const [webinar, setWebinar] = useState<Webinar | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const webinarRes = await api.get(`/webinars/${webinarId}`);
        const attendeesRes = await api.get(
          `/webinars/${webinarId}/attendees`
        );

        setWebinar(webinarRes.data.data);
        setAttendees(attendeesRes.data.data);
      } catch {
         toast.error("Failed to load webinar details");
        setError("Failed to load webinar details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [webinarId]);

  const register = async () => {
    try {
      await api.post(`/webinars/${webinarId}/register`, {
        fullName: name,
        email,
      });
      
//       setWebinar((prev) =>
//   prev ? { ...prev, attendeeCount: res.data.attendeeCount } : prev
// );

      toast.success("🎉 Successfully registered for the webinar!");
      setName("");
      setEmail("");

      // Refresh attendee list
      const attendeesRes = await api.get(
        `/webinars/${webinarId}/attendees`
      );
      setAttendees(attendeesRes.data.data);
    } catch {
  toast.error("⚠️ You are already registered or something went wrong");
    }
  };
if (!webinarId) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-red-500">
      Invalid webinar ID
    </div>
  );
}
  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20 text-slate-400">
        Loading webinar details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20 text-red-500">
        {error}
      </div>
    );
  }

  if (!webinar) return null;
  console.log(attendees)

  return (
    <main className="flex-1 bg-slate-950 py-16">
      <div className="mx-auto max-w-5xl space-y-12 px-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            {webinar.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(webinar.scheduledAt).toLocaleString()}
            </span>

            <span className="flex items-center gap-2">
              <Users size={16} />
              {webinar.attendeeCount} registered
            </span>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-10">

            {/* DESCRIPTION */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-3 text-lg font-semibold text-white">
                About this webinar
              </h2>
              <p className="text-sm leading-relaxed text-slate-400">
                {webinar.description ||
                  "This session focuses on practical knowledge, real-world examples, and interactive discussion."}
              </p>
            </section>

            {/* ATTENDEES */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Attendees
              </h2>

              {attendees.length === 0 && (
                <p className="text-sm text-slate-500">
                  No attendees yet. Be the first to register.
                </p>
              )}

              <ul className="space-y-3">
                {attendees.map((a) => (
                  <li
                    key={a._id}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <Mail size={14} className="text-slate-500" />
                    {a.fullName}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* REGISTER FORM */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <UserPlus size={18} />
              Register
            </h2>

            <div className="space-y-4">
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-600"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-600"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={register}
                className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
