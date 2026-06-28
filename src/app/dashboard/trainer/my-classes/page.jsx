"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getTrainerClasses, updateTrainerClass, deleteTrainerClass, getClassStudents } from "@/lib/actions/trainerDashboardApi";
import { FaSpinner, FaEdit, FaTrash, FaUsers, FaDumbbell, FaTimes, FaUser, FaEnvelope, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function MyClassesPage() {
  const { data: session } = useSession();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Modal state */
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);

  /* Edit class states */
  const [editClass, setEditClass] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  /* Toast state */
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const customCategories = [
    "Home Workout", 
    "Six Pack", 
    "Fat Loss", 
    "Yoga", 
    "Cardio", 
    "Calisthenics"
  ];

  /* Fetch classes  */
  const fetchClasses = async () => {
    if (!session?.user?.email) return;
    try {
      setLoading(true);
      const data = await getTrainerClasses(session.user.email);
      if (data) setClasses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [session]);

  /* Handle class delete*/
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this class permanently?")) return;
    try {
      const res = await deleteTrainerClass(id);
      if (res.success) {
        setClasses(classes.filter((c) => c._id !== id));
        triggerToast("Class deleted successfully.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* Open booked student register */
  const handleOpenStudents = async (id, className) => {
    setSelectedClass(className);
    setShowStudentsModal(true);
    setStudentsLoading(true);
    try {
      const data = await getClassStudents(id);
      setStudents(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setStudentsLoading(false);
    }
  };

  /* Open edit state modal  */
  const handleOpenEdit = (item) => {
    setEditClass({ ...item });
    setShowEditModal(true);
  };

  /* Show floating notification */
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  /* Handle class specification update */
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const res = await updateTrainerClass(editClass._id, editClass);
      if (res.success) {
        setShowEditModal(false);
        fetchClasses();
        triggerToast("Class updated successfully.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <FaSpinner className="text-flexuraNeon animate-spin text-4xl" />
        <p className="text-zinc-300 text-xs font-display uppercase tracking-widest animate-pulse">Synchronizing My Classes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Custom Styles for animations */}
      <style>{`
        @keyframes slideInUp {
          from { transform: translateY(100%) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-slide-up {
          animation: slideInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-progress-bar {
          animation: shrinkWidth 4000ms linear forwards;
        }
      `}</style>

      <div>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-100 tracking-wider uppercase font-display">My Uploaded Classes</h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1.5 font-display">Status, updates and attendee registers</p>
      </div>

      {classes.length === 0 ? (
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-12 text-center text-zinc-500">
          <p className="text-sm font-semibold uppercase tracking-wider font-display">No classes deployed under this profile.</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-950/90 text-[10px] font-black uppercase tracking-widest text-zinc-400 font-display">
                <th className="py-5 px-6">Class Profile</th>
                <th className="py-5 px-6">Schedule Matrix</th>
                <th className="py-5 px-6">Status Badge</th>
                <th className="py-5 px-6 text-right">Actions Panel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40">
              {classes.map((item) => (
                <tr key={item._id} className="hover:bg-zinc-900/20 transition-all duration-300">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800">
                        {item.image ? <Image src={item.image} alt={item.className} fill className="object-cover" unoptimized /> : <div className="w-full h-full flex items-center justify-center text-zinc-600"><FaDumbbell size={16} /></div>}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-100 text-sm tracking-wide">{item.className}</div>
                        <div className="text-[9px] font-black uppercase text-flexuraNeon/80 tracking-widest font-display mt-0.5">{item.category}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                      <FaCalendarAlt className="text-zinc-500" size={11} />
                      <span className="font-semibold">{Array.isArray(item.scheduleDays) ? item.scheduleDays.join(", ") : "Flexible"}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">Slot: {item.time} ({item.duration} mins)</div>
                  </td>

                  <td className="py-5 px-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${item.status === "approved" ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" : "border-yellow-500/20 text-yellow-500 bg-yellow-500/5 animate-pulse"}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button onClick={() => handleOpenStudents(item._id, item.className)} className="p-2.5 text-flexuraNeon hover:text-white border border-zinc-900 hover:border-flexuraNeon/30 hover:bg-flexuraNeon/10 rounded-xl transition" title="View Enrolled Students"><FaUsers size={12} /></button>
                      <button onClick={() => handleOpenEdit(item)} className="p-2.5 text-emerald-400 hover:text-white border border-zinc-900 hover:border-emerald-500/30 hover:bg-emerald-500/10 rounded-xl transition" title="Edit Class"><FaEdit size={12} /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2.5 text-rose-500 hover:text-white border border-zinc-900 hover:border-rose-500/30 hover:bg-rose-500/10 rounded-xl transition" title="Delete Class"><FaTrash size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {}
      {showStudentsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 relative space-y-6">
            <button onClick={() => { setShowStudentsModal(false); setStudents([]); }} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition"><FaTimes size={16} /></button>
            
            <div>
              <h3 className="text-lg font-black text-zinc-100 uppercase tracking-widest font-display">Class Registry</h3>
              <p className="text-[10px] text-flexuraNeon uppercase tracking-widest font-black font-display mt-0.5">{selectedClass}</p>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
              {studentsLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3"><FaSpinner className="text-flexuraNeon animate-spin text-2xl" /><p className="text-[10px] text-zinc-600 font-display uppercase tracking-widest">Accessing profiles...</p></div>
              ) : students.length === 0 ? (
                <p className="text-center py-8 text-xs text-zinc-500 uppercase tracking-wider font-semibold">No active student bookings registered.</p>
              ) : (
                students.map((student) => (
                  <div key={student._id} className="flex items-center justify-between p-3.5 border border-zinc-900 bg-zinc-900/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400"><FaUser size={10} /></div>
                      <div>
                        <div className="text-xs font-bold text-zinc-200">{student.userName || "Verified User"}</div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5"><FaEnvelope size={8} /> {student.userEmail}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {}
      {showEditModal && editClass && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto custom-scrollbar animate-fade-in">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-900 bg-zinc-950 p-6 md:p-8 relative space-y-6">
            <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition"><FaTimes size={16} /></button>
            <div>
              <h3 className="text-lg font-black text-zinc-100 uppercase tracking-widest font-display">Edit Class Specifications</h3>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-display mt-1">Configuring: {editClass.className}</p>
            </div>

            <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-zinc-500 font-display">Class Name</label>
                <input type="text" required value={editClass.className} onChange={(e) => setEditClass({ ...editClass, className: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none transition" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-zinc-500 font-display">Category</label>
                <select value={editClass.category} onChange={(e) => setEditClass({ ...editClass, category: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none transition">
                  {customCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-zinc-500 font-display">Difficulty Level</label>
                <select value={editClass.difficultyLevel} onChange={(e) => setEditClass({ ...editClass, difficultyLevel: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-zinc-300 focus:outline-none transition">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-zinc-500 font-display">Duration (mins)</label>
                <input type="number" required value={editClass.duration} onChange={(e) => setEditClass({ ...editClass, duration: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none transition" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-zinc-500 font-display">Time Slot</label>
                <input type="text" required value={editClass.time} onChange={(e) => setEditClass({ ...editClass, time: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none transition" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-zinc-500 font-display">Price Tag ($)</label>
                <input type="number" step="0.01" required value={editClass.price} onChange={(e) => setEditClass({ ...editClass, price: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none transition" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[9px] font-black uppercase text-zinc-500 font-display">Description</label>
                <textarea rows={3} required value={editClass.description} onChange={(e) => setEditClass({ ...editClass, description: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-3 py-2.5 text-xs text-zinc-100 focus:outline-none transition resize-none" />
              </div>

              <button type="submit" disabled={editLoading} className="sm:col-span-2 mt-2 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/25 transition text-emerald-400 text-xs font-black tracking-widest uppercase font-display disabled:opacity-50">
                {editLoading ? <FaSpinner className="animate-spin text-emerald-400 mx-auto" size={14} /> : "Update Class Matrix"}
              </button>
            </form>
          </div>
        </div>
      )}

      {}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-zinc-950/95 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-start gap-3 animate-slide-up overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-emerald-500 to-teal-400" />
          
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
            <FaCheckCircle size={16} />
          </div>

          <div className="flex-1 space-y-0.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-display">System Status</h4>
            <p className="text-[11px] text-zinc-200 uppercase font-display tracking-wider font-bold">
              {toastMessage}
            </p>
          </div>

          <button onClick={() => setShowToast(false)} className="text-zinc-600 hover:text-zinc-300 transition shrink-0 mt-0.5">
            <FaTimes size={10} />
          </button>

          <div className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 animate-progress-bar" />
        </div>
      )}
    </div>
  );
}