import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, User2, Building2, Clock, FileText, Loader2, ArrowLeft, CheckCircle2, XCircle, X } from "lucide-react";
import toast from "react-hot-toast";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const baseURL = import.meta.env.VITE_EMPORA_LINK;
        if (!baseURL) {
          console.error("Environment variable VITE_EMPORA_LINK is not set.");
          return;
        }
        const response = await axios.get(
          `${baseURL}/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to fetch leave details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  const handleAction = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  const changeStatus = async (id, status) => {
    const loadingToast = toast.loading(`${status === 'Approved' ? 'Approving' : 'Rejecting'} leave request...`);
    try {
      const baseURL = import.meta.env.VITE_EMPORA_LINK;
      if (!baseURL) {
        console.error("Environment variable VITE_EMPORA_LINK is not set.");
        return;
      }
      const response = await axios.put(
        `${baseURL}/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(`Leave request ${status.toLowerCase()} successfully`);
        navigate('/admin-dashboard/leaves');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || `Failed to ${status.toLowerCase()} leave request`);
    } finally {
      toast.dismiss(loadingToast);
      setShowModal(false);
    }
  };

  const ConfirmationModal = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setShowModal(false)} />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                actionType === 'Approved' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {actionType === 'Approved' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {actionType === 'Approved' ? 'Approve Leave Request' : 'Reject Leave Request'}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to {actionType === 'Approved' ? 'approve' : 'reject'} this leave request? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => changeStatus(leave._id, actionType)}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                actionType === 'Approved'
                  ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                  : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {actionType === 'Approved' ? 'Approve' : 'Reject'}
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!leave) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Leave request not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {showModal && <ConfirmationModal />}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Leave Requests
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Leave Request Details</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              leave.status === "Approved"
                ? "bg-green-100 text-green-800"
                : leave.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}>
              {leave.status}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={`${import.meta.env.VITE_EMPORA_LINK}/${leave.employeeId.userId.profileImage}`}
                  alt={leave.employeeId.userId.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User2 className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Employee Name</p>
                      <p className="font-medium text-gray-900">{leave.employeeId.userId.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium text-gray-900">{leave.employeeId.department.dep_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Leave Type</p>
                      <p className="font-medium text-gray-900">{leave.leaveType}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Reason</p>
                      <p className="font-medium text-gray-900">{leave.reason}</p>
                    </div>
                  </div>
                </div>
              </div>

              {leave.status === "Pending" && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAction("Approved")}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Approve Request
                    </button>
                    <button
                      onClick={() => handleAction("Rejected")}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Reject Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetail;
