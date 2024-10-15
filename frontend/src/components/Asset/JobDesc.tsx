import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from 'react-modal';

interface Job {
    jId: string,
    jobTitle: string,
    company: string,
    status: string,
    date: string,
    notes: string
}

interface JobProps {
    job: Job;
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const JobDesc: React.FC<JobProps> = ({job, setJobs}) => {
    const {jobTitle, status, notes, company, date} = job
    const [modal, setModal] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);

    const openModal = () => {
        setModal(true)
    }

    const openUpdate = () => {
        setUpdate(true)
    }

    const closeUpdate = () => {
        setUpdate(false)
        reset()
    }

    const closeModal = () => {
        setModal(false)
    }

    const deleteJob = () => {
        console.log(job)
        axios.delete(`http://localhost:8080/api/v1/jobapplications/${job.jId}`)
            .then(res => {
                console.log(res.data)
                setJobs(res.data);
                closeModal();
            })
            .catch(err => console.log(err))
    }

    type FormValues = {
        jobTitle: string,
        company: string,
        status: string,
        date: string,
        notes: string
    }


    const {register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log('updating', data)
        axios.put(`http://localhost:8080/api/v1/jobapplications/${job.jId}`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => {
                console.log(res.data)
                setJobs(res.data);
                closeUpdate();
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="flex flex-col items-center relative">
                <div className="mb-2 h-0">
                    {notes && <p className="font-body">Note: {notes}</p>}
                </div>
                <div className="bg-white shadow:sm rounded m-5 text-center hover:shadow-lg min-h-[120px] w-4/5 h-[150px] relative border border-4 border-black">
                    <p className="font-body text-3xl">{jobTitle}</p>
                    <p className="font-body text-3xl">@{company}</p>
                    <p className="font-body absolute bottom-0 left-10">{date}</p>
                </div>
                <div className="flex absolute bottom-5 right-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute bottom-1 right-5 cursor-pointer" onClick={openModal}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute bottom-1 right-14 cursor-pointer" onClick={openUpdate}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </div>
            </div>
            <Modal ariaHideApp={false} isOpen={modal} onRequestClose={closeModal} className="flex flex-col justify-center lg:w-1/3 bg-gray-500 rounded-2xl h-1/6" overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <div className="flex justify-center">
                    <p className="font-body font-bold text-2xl p-5">Are you sure you want to delete this?</p>
                </div>
                <div className="flex justify-center gap-5 sm:gap-24">
                    <button type="submit" className="inputBtn w-1/3 md:w-1/5 border-sky-700 bg-sky-700" onClick={deleteJob}>Yes</button>
                    <button onClick={closeModal} className="inputBtn w-1/5 w-1/3 md:w-1/5 border-sky-700 bg-sky-700">No</button>
                </div>
            </Modal>
            <Modal ariaHideApp={false} isOpen={update} onRequestClose={closeUpdate} className="flex flex-col justify-center w-10/12 bg-gray-500 rounded-2xl h-5/6" overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <p className="text-3xl font-body text-center font-bold">Add Job Application</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-10/12 sm:w-11/12 gap-4 ml-10">
                    <label className="inputLabel">Job Title</label>
                    <input {...register("jobTitle", { required: true })} defaultValue={jobTitle} autoComplete="off" className="inputClass" />
                    {errors.jobTitle && <span className="inputLabel text-red-700 font-bold">Please input a job title</span>}
                    
                    <label className="inputLabel">Company</label>
                    <input {...register("company", { required: true })} defaultValue={company} autoComplete="off" className="inputClass" />
                    {errors.company && <span className="inputLabel text-red-700 font-bold">Please input a company name</span>}
                    
                    <label className="inputLabel">Status</label>
                    <select {...register("status", { required: true })} defaultValue={status} className="inputClass">
                        <option value="Applied">Applied</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    {errors.status && <span className="inputLabel text-red-700 font-bold">Please select a status</span>}
                    
                    <label className="inputLabel">date</label>
                    <input type="date" {...register("date", { required: true })} defaultValue={date} className="inputClass" />
                    {errors.date && <span className="inputLabel text-red-700 font-bold">Please select a date</span>}
                    
                    <label className="inputLabel">Notes</label>
                    <textarea {...register("notes")} style={{ resize: 'none' }} defaultValue={notes} className="inputClass h-20" />
                    
                    <div className="flex justify-center gap-5 sm:gap-24">
                        <button type="submit" className="inputBtn w-1/3 md:w-1/5 border-sky-700 bg-sky-700">Update</button>
                        <button onClick={closeUpdate} className="inputBtn w-1/5 w-1/3 md:w-1/5 border-sky-700 bg-sky-700">Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
 
export default JobDesc