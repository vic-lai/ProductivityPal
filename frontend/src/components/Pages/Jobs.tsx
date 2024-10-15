import { useEffect, useState } from 'react';
import '../../styles.css';
import Card from '../Asset/Card';
import axios from 'axios';
import Modal from 'react-modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import JobDesc from '../Asset/JobDesc';

type FormValues = {
    jobTitle: string;
    company: string;
    status: string;
    date: string;
    notes: string;
}

const Jobs = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/jobapplications", data);
            console.log("Job added:", response.data);
            setJobs((prevJobs) => [...prevJobs, response.data]);
            closeModal(); 
        } catch (error) {
            console.error("There was an error adding the job:", error);
        }
    };

    interface Job {
        jId: string;
        jobTitle: string;
        company: string;
        status: string;
        date: string; 
        notes: string;
    }

    const [jobs, setJobs] = useState<Job[]>([]);
    const [applied, setApplied] = useState<Job[]>([]);
    const [InProgress, setInProgress] = useState<Job[]>([]);
    const [rejected, setRejected] = useState<Job[]>([]);
    const [accepted, setAccepted] = useState<Job[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [showApplied, setShowApplied] = useState<boolean>(true);
    const [showInProgress, setShowInProgress] = useState<boolean>(false);
    const [showRejected, setShowRejected] = useState<boolean>(false);
    const [showAccepted, setShowAccepted] = useState<boolean>(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/jobapplications")
            .then(res => {
                setJobs(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const appliedList = jobs.filter((job) => job.status === "Applied")
        const inProgressList = jobs.filter((job) => job.status === "InProgress")
        const rejectedList = jobs.filter((job) => job.status === "Rejected")
        const acceptedList = jobs.filter((job) => job.status === "Accepted")
        setApplied(appliedList)
        setInProgress(inProgressList)
        setRejected(rejectedList)
        setAccepted(acceptedList)
    },[jobs])

    const openModal = () => {
        setModal(true);
        reset();
    };

    const closeModal = () => {
        setModal(false);
    };

    const handleApplied = () => {
        setShowApplied(true)
        setShowInProgress(false)
        setShowRejected(false)
        setShowAccepted(false)
    }

    const handleInProgress = () => {
        setShowApplied(false)
        setShowInProgress(true)
        setShowRejected(false)
        setShowAccepted(false)
    }
    const handleRejected = () => {
        setShowApplied(false)
        setShowInProgress(false)
        setShowRejected(true)
        setShowAccepted(false)
    }
    const handleAccepted= () => {
        setShowApplied(false)
        setShowInProgress(false)
        setShowRejected(false)
        setShowAccepted(true)
    }

    return (
        <div className="text-black-400 text-xl font-bold bg-sky-600 h-full"> 
            <div className="flex justify-center items-center">
                <p className="border-b border-black font-body p-2 text-4xl">Job Applications</p>
            </div>
            <div className="flex justify-center">
                <button className={`rounded-3xl p-2 m-2 border-2 border-black transition ease-in duration-500 min-w-[120px] ${showApplied=== true ? 'bg-sky-700' : 'bg-white'}`} onClick={handleApplied}>Applied</button>
                <button className={`rounded-3xl p-2 m-2 border-2 border-black transition ease-in duration-500 min-w-[120px] ${showInProgress=== true ? 'bg-sky-700' : 'bg-white'}`} onClick={handleInProgress}>Interview</button>
                <button className={`rounded-3xl p-2 m-2 border-2 border-black transition ease-in duration-500 min-w-[120px] ${showRejected=== true ? 'bg-sky-700' : 'bg-white'}`} onClick={handleRejected}>Rejected</button>
                <button className={`rounded-3xl p-2 m-2 border-2 border-black transition ease-in duration-500 min-w-[120px] ${showAccepted=== true ? 'bg-sky-700' : 'bg-white'}`} onClick={handleAccepted}>Accepted</button>
            </div>

            {showApplied &&
            <div>
                <div className="flex items-center">
                    <p className="font-body ml-5 text-3xl">Applied: ({jobs.length})</p>
                    <button onClick={openModal} className="bg-white rounded-3xl p-2 m-2 border-2 border-black hover:bg-sky-700 transition ease-in duration-500 ">
                        Add Job
                    </button>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {applied.map((job) => (
                        <JobDesc key={job.jId} job={job} setJobs={setJobs} />
                    ))}
                </div>
            </div>
            }
            {showInProgress &&
            <div>
                <div className="flex items-center">
                    <p className="font-body ml-5 text-3xl">In Progress: ({InProgress.length})</p>
                    <button onClick={openModal} className="bg-white rounded-3xl p-2 m-2 border-2 border-black hover:bg-sky-700 transition ease-in duration-500">
                        Add Job
                    </button>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {InProgress.map((job) => (
                        <JobDesc key={job.jId} job={job} setJobs={setJobs} />
                    ))}
                </div>
            </div>
            }           
            {showRejected &&
            <div>
                <div className="flex items-center">
                    <p className="font-body ml-5 text-3xl">Rejected: ({rejected.length})</p>
                    <button onClick={openModal} className="bg-white rounded-3xl p-2 m-2 border-2 border-black hover:bg-sky-700 transition ease-in duration-500">
                        Add Job
                    </button>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {rejected.map((job) => (
                        <JobDesc key={job.jId} job={job} setJobs={setJobs} />
                    ))}
                </div>
            </div>
            }           
            {showAccepted &&
            <div>
                <div className="flex items-center">
                    <p className="font-body ml-5 text-3xl">Accepted: ({accepted.length})</p>
                    <button onClick={openModal} className="bg-white rounded-3xl p-2 m-2 border-2 border-black hover:bg-sky-700 transition ease-in duration-500">
                        Add Job
                    </button>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {accepted.map((job) => (
                        <JobDesc key={job.jId} job={job} setJobs={setJobs} />
                    ))}
                </div>
            </div>
            }                 
          

            <Modal ariaHideApp={false} isOpen={modal} onRequestClose={closeModal} className="flex flex-col justify-center w-10/12 bg-gray-500 rounded-2xl h-5/6" overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <p className="text-3xl font-body text-center font-bold">Add Job Application</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-10/12 sm:w-11/12 gap-4 ml-10">
                    <label className="inputLabel">Job Title</label>
                    <input {...register("jobTitle", { required: true })} autoComplete="off" className="inputClass" />
                    {errors.jobTitle && <span className="inputLabel text-red-700 font-bold">Please input a job title</span>}
                    
                    <label className="inputLabel">Company</label>
                    <input {...register("company", { required: true })} autoComplete="off" className="inputClass" />
                    {errors.company && <span className="inputLabel text-red-700 font-bold">Please input a company name</span>}
                    
                    <label className="inputLabel">Status</label>
                    <select {...register("status", { required: true })} className="inputClass">
                        <option value="Applied">Applied</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    {errors.status && <span className="inputLabel text-red-700 font-bold">Please select a status</span>}
                    
                    <label className="inputLabel">Date</label>
                    <input type="date" {...register("date", { required: true })} className="inputClass" />
                    {errors.date && <span className="inputLabel text-red-700 font-bold">Please select a date</span>}
                    
                    <label className="inputLabel">Notes</label>
                    <textarea {...register("notes")} style={{ resize: 'none' }} className="inputClass h-20" />
                    
                    <div className="flex justify-center gap-5 sm:gap-24">
                        <button type="submit" className="inputBtn w-1/3 md:w-1/5 border-sky-700 bg-sky-700">Create</button>
                        <button onClick={closeModal} className="inputBtn w-1/5 w-1/3 md:w-1/5 border-sky-700 bg-sky-700">Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Jobs;
