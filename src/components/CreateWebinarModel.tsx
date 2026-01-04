import { useState } from "react";
import api from "../services/api";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
  onCreated: () => void;
};

export default function CreateWebinarModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);

  const createWebinar = async () => {
    if (!title || !scheduledAt) {
      toast.error("Title and date are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/webinars", {
        title,
        description,
        scheduledAt,
      });

      toast.success("Webinar created successfully");
      onCreated();
      onClose();
    } catch {
      toast.error("Failed to create webinar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6 border border-slate-800">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Create Webinar
        </h3>

        <div className="space-y-4">
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white"
            placeholder="Webinar title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white"
            placeholder="Description (optional)"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="datetime-local"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={createWebinar}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
