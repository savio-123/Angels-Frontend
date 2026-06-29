import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import api from "../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Dashboard.css";
import Swal from "sweetalert2";
import {
    Calendar as CalendarIcon,
    Clock3,
    CheckCircle,
    Star,
    Trash2,
    Phone,
    CalendarDays
} from "lucide-react";

import Footer from "../components/Footer";
import InnerNavbar from "../components/InnerNavbar";
import AddService from "../components/AddService";
import ManageServices from "../components/ManageServices";

function Dashboard() {

    const [appointments, setAppointments] = useState([])
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [loadingId, setLoadingId] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAddService, setShowAddService] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    useEffect(() => {

        fetchAppointments();
        fetchTasks();

    }, [])

    const fetchAppointments = async () => {

        try {

            const res = await api.get(
                "parlour/appointments/"
            )

            setAppointments(res.data)

        } catch (error) {

            console.error(error)
        }
    }

    const fetchTasks = async () => {

        try {
    
            const res = await api.get(
                "parlour/tasks/"
            );
    
            setTasks(res.data);
    
        } catch (error) {
    
            console.error(error);
        }
    };

    const formatDate = (date) => {

        return (
            date.getFullYear() +
            "-" +
            String(
                date.getMonth() + 1
            ).padStart(2, "0") +
            "-" +
            String(
                date.getDate()
            ).padStart(2, "0")
        );
    };

    const selectedDateString = formatDate(selectedDate);
    const selectedAppointments = appointments.filter(
        appointment =>
            appointment.appointment_date === selectedDateString
    );
    
    const pendingTasks = tasks.filter(
        task =>
            task.task_date === selectedDateString &&
            !task.completed
    );
    
    const completedTasks = tasks.filter(
        task =>
            task.task_date === selectedDateString &&
            task.completed
    );

    const addTask = async () => {

        if (!taskInput.trim())
            return;
    
        try {
    
            await api.post(
                "parlour/tasks/",
                {
                    title: taskInput,
                    task_date:
                        selectedDateString
                }
            );
    
            setTaskInput("");
    
            fetchTasks();
    
        } catch (error) {
    
            console.error(error);
        }
    };

    const updateStatus = async (
        id,
        status
    ) => {
    
        setLoadingId(id);
    
        try {
    
            await api.patch(
    
                `parlour/appointments/${id}/`,
    
                {
                    status
                }
            );
    
            await fetchAppointments();
    
            return true;
    
        } catch (error) {
    
            console.error(error);
    
            return false;
    
        } finally {
    
            setLoadingId(null);
        }
    };

    const toggleTask = async (
        taskId
    ) => {
    
        try {
    
            await api.patch(
                `parlour/tasks/${taskId}/`
            );
    
            fetchTasks();
    
        } catch (error) {
    
            console.error(error);
        }
    };

    const approveAppointment = async (id) => {

        const result = await Swal.fire({
    
            title: "Approve Appointment?",
    
            text:
                "The customer will receive an approval email.",
    
            icon: "question",
    
            showCancelButton: true,
    
            confirmButtonText: "Approve",
    
            cancelButtonText: "Cancel",
    
            confirmButtonColor: "#10b981",
    
            reverseButtons: true
        });
    
        if (!result.isConfirmed) {
            return;
        }
    
        const success = await updateStatus(
            id,
            "Approved"
        );
    
        if (success) {
    
            Swal.fire({
    
                icon: "success",
    
                title: "Approved",
    
                text:
                    "Appointment approved successfully.",
    
                timer: 1500,
    
                showConfirmButton: false
            });
    
        } else {
    
            Swal.fire({
    
                icon: "error",
    
                title: "Oops...",
    
                text:
                    "Failed to approve appointment."
            });
        }
    };
    
    const cancelAppointment = async (id) => {

        const result = await Swal.fire({
    
            title: "Cancel Appointment?",
    
            text:
                "The customer will be notified.",
    
            icon: "warning",
    
            showCancelButton: true,
    
            confirmButtonText: "Cancel Appointment",
    
            cancelButtonText: "Keep",
    
            confirmButtonColor: "#ef4444",
    
            reverseButtons: true
        });
    
        if (!result.isConfirmed) {
            return;
        }
    
        const success = await updateStatus(
            id,
            "Cancelled"
        );
    
        if (success) {
    
            Swal.fire({
    
                icon: "success",
    
                title: "Cancelled",
    
                text:
                    "Appointment cancelled successfully.",
    
                timer: 1500,
    
                showConfirmButton: false
            });
    
        } else {
    
            Swal.fire({
    
                icon: "error",
    
                title: "Oops...",
    
                text:
                    "Failed to cancel appointment."
            });
        }
    };

    const deleteAppointment = async (id) => {

        setLoadingId(id);

        const result = await Swal.fire({
    
            title: "Delete Appointment?",
    
            text:
                "This action cannot be undone.",
    
            icon: "warning",
    
            showCancelButton: true,
    
            confirmButtonText: "Delete",
    
            cancelButtonText: "Keep",
    
            confirmButtonColor: "#dc3545",
    
            reverseButtons: true
        });
    
        if (!result.isConfirmed) {
            setLoadingId(null);
            return;
        }
    
        try {
    
            await api.delete(
                `parlour/appointments/${id}/`
            );
    
            await Swal.fire({
    
                icon: "success",
    
                title: "Deleted",
    
                text:
                    "Appointment removed successfully.",
    
                timer: 1500,
    
                showConfirmButton: false
            });
    
            fetchAppointments();
    
        } catch (error) {
    
            console.error(error);
    
            Swal.fire({
    
                icon: "error",
    
                title: "Oops...",
    
                text:
                    "Failed to delete appointment."
            });
        }
        finally {

            setLoadingId(null);
        }
    };

    const handledeleteTask = async (
        taskId
    ) => {  
        try {
            await api.delete(
                `parlour/tasks/${taskId}/`
            );
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };


    const totalAppointments = appointments.length;

    const pendingCount =
        appointments.filter(
            a => a.status === "Pending"
        ).length;

    const approvedCount =
        appointments.filter(
            a => a.status === "Approved"
        ).length;

    const completedCount =
        appointments.filter(
            a => a.status === "Completed"
        ).length;

    const filteredAppointments =
        appointments.filter(
            appointment => {
    
                const matchesSearch =
                    appointment.customer_name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );
    
                const matchesStatus =
                    !statusFilter ||
                    statusFilter === "All" ||
                    appointment.status === statusFilter;
    
                const matchesDate =
                    appointment.appointment_date ===
                    selectedDateString;
    
                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesDate
                );
            }
        );

        const getAppointmentsCount = (date) => {

            const dateString = formatDate(date);
        
            return appointments.filter(
                appointment =>
                    appointment.appointment_date === dateString
            ).length;
        };

        const getTasksCount = (date) => {

            const dateString = formatDate(date);
            return tasks.filter(
                task =>
                    task.task_date === dateString
            ).length;
        };

    return (

        <>

        <InnerNavbar />
        <div className="dashboard-page">
        <div className="container">

            <h2 className="mb-4">
                Appointments
            </h2>

            <div className="stats-grid">

                <div className="stat-card">

                <div className="stat-top">

                    <p>TOTAL APPOINTMENTS</p>

                    <CalendarIcon
                        size={22}
                        className="stat-icon"
                    />

                    </div>

                    <h3>{totalAppointments}</h3>

                    <div className="stat-bg-icon1">
                        <CalendarIcon size={120}/>
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-top">

                        <p>PENDING APPOINTMENTS</p>

                        <span className="stat-icon">
                            <Clock3 size={22}/>
                        </span>

                    </div>

                    <h3>{pendingCount}</h3>

                    <div className="stat-bg-icon2">
                        <Clock3 size={120}/>
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-top">

                        <p>APPROVED APPOINTMENTS</p>

                        <span className="stat-icon">
                            <CheckCircle size={22}/>
                        </span>

                    </div>

                    <h3>{approvedCount}</h3>

                    <div className="stat-bg-icon3">
                        <CheckCircle size={120}/>
                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-top">

                        <p>COMPLETED APPOINTMENTS</p>

                        <span className="stat-icon">
                            <Star size={22} />
                        </span>

                    </div>

                    <h3>{completedCount}</h3>

                    <div className="stat-bg-icon4">
                        <Star size={120}/>
                    </div>

                </div>

                </div>

                <div className="dashboard-top">

                    <div className="dashboard-left">

                        <div className="calendar-card">

                            <Calendar
                                value={selectedDate}
                                onChange={setSelectedDate}

                                tileContent={({ date, view }) => {

                                    if (view !== "month")
                                        return null;

                                    const appointmentCount = getAppointmentsCount(date);
                                    const taskCount = getTasksCount(date);
                                    const count = appointmentCount + taskCount;

                                    if (count === 0)
                                        return null;

                                    return (

                                        <div className="calendar-indicators">
                                    
                                            {
                                                appointmentCount > 0 && (
                                                    <div className="appointment-dot">
                                                        A:{appointmentCount}
                                                    </div>
                                                )
                                            }
                                    
                                            {
                                                taskCount > 0 && (
                                                    <div className="task-dot">
                                                        T:{taskCount}
                                                    </div>
                                                )
                                            }
                                    
                                        </div>
                                    );
                                }}
                            />

                        </div>
                        <div className="appointments-card">
                            <div className="appointments-header">

                                <h5>
                                    Appointments on {selectedDateString}
                                </h5>

                                <span className="booking-count">

                                    {selectedAppointments.length}

                                    {" "}Bookings

                                </span>

                            </div>

                            {
                                selectedAppointments.map(
                                        appointment => (

                                            <div
                                                key={appointment.id}
                                                className="calendar-appointment"
                                            >

                                                <div className="calendar-appointment-header">

                                                    <strong>
                                                        {appointment.customer_name}
                                                    </strong>

                                                    <span
                                                        className={
                                                            `status-badge ${appointment.status.toLowerCase()}`
                                                        }
                                                    >
                                                        {appointment.status}
                                                    </span>

                                                </div>

                                                <div>
                                                    {appointment.service_name}
                                                </div>

                                                <div>

                                                    {
                                                        new Date(
                                                            `1970-01-01T${appointment.appointment_time}`
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true
                                                            }
                                                        )
                                                    }

                                                </div>

                                            </div>

                                        )
                                    )
                            }

                            </div>
                            </div>
                            <div className="tasks-card">
                            <div className="tasks-header">
                                <div className="tasks-header-top">

                                    <h4>Today's Tasks</h4>

                                    <div className="task-count">
                                      {pendingTasks.length}
                                    </div>

                                </div>

                                <div className="task-input-row">

                                    <input
                                        type="text"
                                        value={taskInput}
                                        onChange={(e) =>
                                            setTaskInput(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Add a new task..."
                                    />

                                    <button
                                        className="add-task-btn"
                                        onClick={addTask}
                                    >
                                        + Add
                                    </button>

                                </div>

                            </div>

                            <div className="tasks-body">

                             {
                                pendingTasks.length === 0 ? (

                                    <div className="empty-task-message"> 

                                        No tasks planned for this day.

                                    </div>

                                ) : (

                                    pendingTasks.map(task => (

                                            <div
                                                key={task.id}
                                                className="task-row"
                                            >

                                                <div className="task-left">

                                                    <span
                                                        className="task-checkbox"
                                                        onClick={() =>
                                                            toggleTask(task.id)
                                                        }
                                                    >
                                                        ☐
                                                    </span>

                                                    <span className="task-text">

                                                        {task.title}

                                                    </span>

                                                </div>

                                                <button
                                                    className="task-delete-btn"
                                                    onClick={() =>
                                                        handledeleteTask(task.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>


                                        ))
                                )
                            }

                                <div className="completed-divider">

                                    <span>Completed</span>

                                </div>

                                {
                                    completedTasks.length === 0 ? (

                                        <div className="empty-task-message text-center">

                                                No tasks completed yet.

                                        </div>

                                    ) : (

                                        completedTasks.map(task => (

                                                <div
                                                    key={task.id}
                                                    className="
                                                        task-row
                                                        completed-row
                                                    "
                                                >

                                                    <div className="task-left">

                                                        <span
                                                            className="
                                                                task-checkbox
                                                                checked
                                                            "
                                                            onClick={() =>
                                                                toggleTask(task.id)
                                                            }
                                                        >
                                                            ☑
                                                        </span>

                                                        <span className="task-text">

                                                            {task.title}

                                                        </span>

                                                    </div>

                                                    <button
                                                        className="task-delete-btn"
                                                        onClick={() =>
                                                            handledeleteTask(task.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            ))
                                    )
                                }
                            </div>

                            </div>
                            </div>

                            <div className="management-section">

                                <div className="management-header">

                                    <div>

                                        <h2>Appointment Management</h2>

                                        <p>
                                            Manage and track all salon bookings
                                        </p>

                                    </div>

                                    <div className="booking-pill">

                                        {appointments.length} Bookings

                                    </div>

                                </div>

                                <div className="management-card">

                                    <div className="management-toolbar">

                                        <div className="toolbar-left">

                                            <input
                                                type="text"
                                                placeholder="Search clients..."
                                                className="search-input"
                                                value={search}
                                                onChange={(e)=>
                                                    setSearch(e.target.value)
                                                }
                                            />

                                            <select
                                                className="status-select"
                                                value={statusFilter}
                                                onChange={(e)=>
                                                    setStatusFilter(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    All Statuses
                                                </option>

                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Approved">
                                                    Approved
                                                </option>

                                                <option value="Completed">
                                                    Completed
                                                </option>

                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>

                                            </select>

                                        </div>
                                     <Link to="/book-appointment">
                                            <button className="add-booking-btn">
                                                + Add Appointment
                                            </button>
                                     </Link>
                                    </div>

                                    <div className="table-wrapper">

                                        <table className="management-table">

                                            <thead className="justify-content-around">

                                                <tr>

                                                    <th>Client</th>
                                                    <th>Phone</th>
                                                    <th>Service</th>
                                                    <th>Date & Time</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {appointments
                                                    .filter(appointment => {

                                                        const matchesSearch =
                                                            appointment.customer_name
                                                                .toLowerCase()
                                                                .includes(
                                                                    search.toLowerCase()
                                                                );

                                                        const matchesStatus =
                                                            !statusFilter ||
                                                            appointment.status === statusFilter;

                                                        return (
                                                            matchesSearch &&
                                                            matchesStatus
                                                        );

                                                    })
                                                    .map(appointment => (

                                                    <tr key={appointment.id}>

                                                        <td>
                                                            {appointment.customer_name}
                                                        </td>

                                                        <td>
                                                            {appointment.customer_phone}
                                                        </td>

                                                        <td>
                                                            {appointment.service_name}
                                                        </td>

                                                        <td>

                                                            {
                                                                appointment.appointment_date
                                                            }

                                                            {" • "}

                                                            {
                                                                new Date(
                                                                    `1970-01-01T${appointment.appointment_time}`
                                                                ).toLocaleTimeString(
                                                                    [],
                                                                    {
                                                                        hour:"numeric",
                                                                        minute:"2-digit",
                                                                        hour12:true
                                                                    }
                                                                )
                                                            }

                                                        </td>

                                                        <td>

                                                            <span
                                                                className={
                                                                    `status-badge ${appointment.status.toLowerCase()}`
                                                                }
                                                            >
                                                                {appointment.status}
                                                            </span>

                                                        </td>

                                                        <td>

                                                            <div className="action-buttons">

                                                                {appointment.status === "Pending" && (

                                                                    <>
                                                                       <button
                                                                            className="approve-btn"
                                                                            disabled={loadingId === appointment.id}
                                                                            onClick={() =>
                                                                                approveAppointment(appointment.id)
                                                                            }
                                                                        >
                                                                            {
                                                                                loadingId === appointment.id
                                                                                    ? "Approving..."
                                                                                    : "Approve"
                                                                            }
                                                                        </button>

                                                                        <button
                                                                            className="cancel-btn"
                                                                            disabled={loadingId === appointment.id}
                                                                            onClick={() =>
                                                                                cancelAppointment(appointment.id)
                                                                            }
                                                                        >
                                                                            {
                                                                                loadingId === appointment.id
                                                                                    ? "Cancelling..."
                                                                                    : "Cancel"
                                                                            }
                                                                        </button>
                                                                    </>

                                                                )}

                                                        {appointment.status === "Approved" && (

                                                                    <>
                                                                        <button
                                                                            className="complete-btn"
                                                                            disabled={loadingId === appointment.id}
                                                                            onClick={() =>
                                                                                updateStatus(
                                                                                    appointment.id,
                                                                                    "Completed"
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                loadingId === appointment.id
                                                                                    ? "Completing..."
                                                                                    : "Complete"
                                                                            }
                                                                        </button>

                                                                        <button
                                                                            className="cancel-btn"
                                                                            disabled={loadingId === appointment.id}
                                                                            onClick={() =>
                                                                                cancelAppointment(appointment.id)
                                                                            }
                                                                        >
                                                                            {
                                                                                loadingId === appointment.id
                                                                                    ? "Cancelling..."
                                                                                    : "Cancel"
                                                                            }
                                                                        </button>
                                                                    </>

                                                                )}

                                                                <button
                                                                    className="delete-icon-btn"
                                                                    disabled={loadingId === appointment.id}
                                                                    onClick={() =>
                                                                        deleteAppointment(
                                                                            appointment.id
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 size={16}/>
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                ))}

                                            </tbody>

                                        </table>
                                        
                                    </div>

                                    <div className="mobile-management-cards">

                                        {appointments
                                            .filter(appointment => {

                                                const matchesSearch =
                                                    appointment.customer_name
                                                        .toLowerCase()
                                                        .includes(
                                                            search.toLowerCase()
                                                        );

                                                const matchesStatus =
                                                    !statusFilter ||
                                                    appointment.status === statusFilter;

                                                return (
                                                    matchesSearch &&
                                                    matchesStatus
                                                );

                                            })
                                            .map(appointment => (

                                            <div
                                                key={appointment.id}
                                                className="management-mobile-card"
                                            >

                                                <div className="mobile-card-header">

                                                    <div>

                                                        <h5>
                                                            {appointment.customer_name}
                                                        </h5>

                                                        <p>
                                                            {appointment.service_name}
                                                        </p>

                                                    </div>

                                                    <span
                                                        className={
                                                            `status-badge ${appointment.status.toLowerCase()}`
                                                        }
                                                    >
                                                        {appointment.status}
                                                    </span>

                                                </div>

                                                <div className="mobile-card-body">

                                                <p className="mobile-info-row">
                                                    <Phone size={16}/>
                                                    <span>{appointment.customer_phone}</span>
                                                </p>

                                                <p className="mobile-info-row">
                                                    <CalendarDays size={16}/>
                                                    <span>{appointment.appointment_date}</span>
                                                </p>

                                                <p className="mobile-info-row">
                                                    <Clock3 size={16}/>
                                                    <span>
                                                        {
                                                            new Date(
                                                                `1970-01-01T${appointment.appointment_time}`
                                                            ).toLocaleTimeString(
                                                                [],
                                                                {
                                                                    hour:"numeric",
                                                                    minute:"2-digit",
                                                                    hour12:true
                                                                }
                                                            )
                                                        }
                                                    </span>
                                                </p>

                                                </div>

                                                <div className="mobile-card-actions">

                                                    {appointment.status === "Pending" && (

                                                        <>
                                                            <button
                                                                className="approve-btn"
                                                                onClick={() =>
                                                                    approveAppointment(
                                                                        appointment.id
                                                                    )
                                                                }
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                className="cancel-btn"
                                                                onClick={() =>
                                                                    cancelAppointment(
                                                                        appointment.id
                                                                    )
                                                                }
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>

                                                    )}

                                                    {appointment.status === "Approved" && (

                                                        <>
                                                            <button
                                                                className="complete-btn"
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        appointment.id,
                                                                        "Completed"
                                                                    )
                                                                }
                                                            >
                                                                Complete
                                                            </button>

                                                            <button
                                                                className="cancel-btn"
                                                                onClick={() =>
                                                                    cancelAppointment(
                                                                        appointment.id
                                                                    )
                                                                }
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>

                                                    )}

                                                    {(appointment.status === "Completed" ||
                                                    appointment.status === "Cancelled") && (

                                                        <button
                                                            className="delete-icon-btn"
                                                            onClick={() =>
                                                                deleteAppointment(
                                                                    appointment.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2 size={18}/>
                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                                {
                                    showAddService ? (

                                        <AddService
                                            onSuccess={() => {
                                                setShowAddService(false);
                                            }}
                                            onClose={() => setShowAddService(false)}
                                        />

                                    ) : (

                                        <ManageServices
                                            onAddService={() =>
                                                setShowAddService(true)
                                            }
                                        />

                                    )
                                }

                            </div>
        </div>
    </div>
  <Footer />
</>
    )
}

export default Dashboard