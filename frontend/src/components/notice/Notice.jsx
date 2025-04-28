import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Trash2, Loader2, AlertCircle, Bell, X } from "lucide-react";
import { toast } from "react-hot-toast";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, noticeId: null, title: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const baseURL = import.meta.env.VITE_EMPORA_LINK;

  // Fetch all notices
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/notice`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        setNotices(response.data.notices);
      }
    } catch (error) {
      toast.error("Failed to fetch notices");
      console.error("Error fetching notices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  // Add new notice
  const handleAddNotice = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${baseURL}/api/notice/add`, newNotice, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        setNotices([...notices, response.data.notice]);
        setNewNotice({ title: "", content: "" });
        setShowAddForm(false);
        toast.success("Notice added successfully");
      }
    } catch (error) {
      toast.error("Failed to add notice");
      console.error("Error adding notice:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated delete notice function
  const handleDeleteNotice = async () => {
    if (!deleteModal.noticeId) return;
    setIsDeleting(true);
    
    try {
      const response = await axios.delete(`${baseURL}/api/notice/${deleteModal.noticeId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        setNotices(notices.filter((notice) => notice._id !== deleteModal.noticeId));
        toast.success("Notice deleted successfully");
        setDeleteModal({ show: false, noticeId: null, title: "" });
      }
    } catch (error) {
      toast.error("Failed to delete notice");
      console.error("Error deleting notice:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Manage Notices</h2>
                  <p className="text-gray-600 mt-1">Create and manage company-wide announcements</p>
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    showAddForm 
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
                >
                  {showAddForm ? (
                    <>
                      <X size={18} /> Cancel
                    </>
                  ) : (
                    <>
                      <Plus size={18} /> Add Notice
                    </>
                  )}
                </button>
              </div>

              {showAddForm && (
                <form onSubmit={handleAddNotice} className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newNotice.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter notice title"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notice Content</label>
                      <textarea
                        name="content"
                        value={newNotice.content}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        rows={4}
                        placeholder="Enter notice content"
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Bell className="w-4 h-4" />
                            Publish Notice
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {notices.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No notices yet</h3>
                  <p className="text-gray-500 mt-1">Create your first notice to make an announcement.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notices.map((notice) => (
                    <div
                      key={notice._id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-200 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                            {notice.title}
                          </h3>
                          <p className="mt-2 text-gray-600 whitespace-pre-wrap">{notice.content}</p>
                          <div className="mt-2 text-sm text-gray-500">
                            Posted on {new Date(notice.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => setDeleteModal({ 
                            show: true, 
                            noticeId: notice._id, 
                            title: notice.title 
                          })}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete notice"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Delete Confirmation Modal */}
              {deleteModal.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                      Delete Notice
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      Are you sure you want to delete the notice "{deleteModal.title}"? This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setDeleteModal({ show: false, noticeId: null, title: "" })}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        disabled={isDeleting}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteNotice}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                      >
                        {isDeleting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4" />
                            Delete Notice
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Manage Notices</h2>
                <p className="text-gray-600 mt-1">Create and manage company-wide announcements</p>
              </div>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  showAddForm 
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                {showAddForm ? (
                  <>
                    <X size={18} /> Cancel
                  </>
                ) : (
                  <>
                    <Plus size={18} /> Add Notice
                  </>
                )}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddNotice} className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newNotice.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter notice title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Content</label>
                    <textarea
                      name="content"
                      value={newNotice.content}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      rows={4}
                      placeholder="Enter notice content"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4" />
                          Publish Notice
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {notices.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No notices yet</h3>
                <p className="text-gray-500 mt-1">Create your first notice to make an announcement.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice._id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-200 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                          {notice.title}
                        </h3>
                        <p className="mt-2 text-gray-600 whitespace-pre-wrap">{notice.content}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          Posted on {new Date(notice.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteModal({ 
                          show: true, 
                          noticeId: notice._id, 
                          title: notice.title 
                        })}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete notice"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    Delete Notice
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    Are you sure you want to delete the notice "{deleteModal.title}"? This action cannot be undone.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setDeleteModal({ show: false, noticeId: null, title: "" })}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteNotice}
                      disabled={isDeleting}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete Notice
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;