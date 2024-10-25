import ReactCardFlip from 'react-card-flip';
import '../../styles.css'
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Problem {
    id: string,
    difficulty: string,
    name: string,
    notes: string,
    type: string,
    status: string,
    link: string
    
}

interface CardProps {
    problem: Problem;
    setProblems: React.Dispatch<React.SetStateAction<Problem[]>>;
}

const Card: React.FC<CardProps> = ({problem, setProblems}) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const {difficulty, name, notes, type, status, link} = problem
    const difficultyClass = difficulty === 'Easy' ? 'bg-green-400' : difficulty === 'Medium' ? 'bg-yellow-400' : difficulty === 'Hard' ? 'bg-red-500': 'bg-white-500';
    const baseClass = "font-body text-sm p-2 absolute bottom-0 w-full"
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

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
        reset();
    }

    const closeModal = () => {
        setModal(false)
    }

    const deleteProblem = () => {
        axios.delete(`http://localhost:8080/api/v1/leetcodeproblems/${problem.id}`)
            .then(res => {
                console.log(res.data)
                setProblems(res.data);
                closeModal();
                setIsFlipped(false);
            })
            .catch(err => console.log(err))
    }

    type FormValues = {
        name: string
        difficulty: string
        notes: string
        type: string
        status: string
        link: string
    }

    const {register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log('updating', data)
        axios.put(`http://localhost:8080/api/v1/leetcodeproblems/${problem.id}`, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(res => {
                console.log(res.data)
                setProblems(res.data);
                closeUpdate();
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} key={problem.id}>
                <div className="bg-white shadow:sm rounded m-5 text-center hover:shadow-lg relative pb-10 backface-hidden min-h-[140px] cursor-pointer " onClick={handleFlip}>
                    <p className="p-4 font-body text-3xl">{name}</p>
                    <p className="font-body">{type}</p>
                    <div className={`${difficultyClass} ${baseClass}`}>
                        <span>{difficulty}</span>
                    </div>
                </div>
                <div className="bg-white shadow:sm rounded m-5 text-center hover:shadow-lg relative pb-10 backface-hidden min-h-[140px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute right-5 cursor-pointer" onClick={handleFlip}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    <p className="font-body text-2xl">Notes</p>
                    <p className="font-body">{notes}</p>
                    <div className="flex justify-center">
                    {link && <a href={link} className="absolute bottom-0 text-blue-400">Link</a>}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute bottom-1 right-5 cursor-pointer" onClick={openModal}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 absolute bottom-1 right-14 cursor-pointer" onClick={openUpdate}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </div>
            </ReactCardFlip>
            <Modal ariaHideApp={false} isOpen={modal} onRequestClose={closeModal} className="flex flex-col justify-center lg:w-1/3 bg-gray-500 rounded-2xl h-1/6" overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <div className="flex justify-center">
                    <p className="font-body font-bold text-2xl p-5">Are you sure you want to delete this?</p>
                </div>
                <div className="flex justify-center gap-5 sm:gap-24">
                    <button type="submit" className="inputBtn w-1/3 md:w-1/5" onClick={deleteProblem}>Yes</button>
                    <button onClick={closeModal} className="inputBtn w-1/5 w-1/3 md:w-1/5">No</button>
                </div>
            </Modal>
            <Modal ariaHideApp={false} isOpen={update} onRequestClose={closeUpdate} className="flex flex-col justify-center w-10/12 bg-gray-500 rounded-2xl h-5/6" overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <p className="text-3xl font-body text-center font-bold">Update Leetcode Problem</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-10/12 sm:w-11/12 gap-4 ml-10">
                    <label className="inputLabel">Name</label>
                    <input {...register("name", { required: true})} defaultValue={problem.name} autoComplete="off" className="inputClass" />
                    {errors.name && <span className="inputLabel text-red-700 font-bold">Please input a name</span>}
                    <label className="inputLabel">Difficulty</label>
                    <select {...register("difficulty")} defaultValue={problem.difficulty} className="inputClass">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <label className="inputLabel">Type (Based on Neetcode)</label>
                    <select {...register("type", { required: 'Please select a type' })} defaultValue={problem.type} className="inputClass">
                        <option value="">Select Type</option>
                        <option value="Arrays & Hashing">Arrays & Hashing</option>
                        <option value="Two Pointers">Two Pointers</option>
                        <option value="Stack">Stack</option>
                        <option value="Binary Search">Binary Search</option>
                        <option value="Sliding Window">Sliding Window</option>
                        <option value="Linked List">Linked List</option>
                        <option value="Trees">Trees</option>
                        <option value="Tries">Tries</option>
                        <option value="Backtracking">Backtracking</option>
                        <option value="Heap / Priority Queue">Heap / Priority Queue</option>
                        <option value="Backtracking">Backtracking</option>
                        <option value="1-D DP">1-D DP</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.type && <span className="inputLabel text-red-700 font-bold">{errors.type.message}</span>}
                    <label className="inputLabel">Status</label>
                    <select {...register("status")} defaultValue={problem.status} className="inputClass">
                        <option value="To-Do">To-do</option>
                        <option value="Attempted">Attempted</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <label className="inputLabel">Link</label>
                    <input {...register("link")} className="inputClass" defaultValue={problem.link} />
                    <label className="inputLabel">Notes</label>
                    <textarea {...register("notes")} style={{ resize:'none'}} defaultValue={problem.notes} className="inputClass h-20"/>
                    <div className="flex justify-center gap-5 sm:gap-24">
                        <button type="submit" className="inputBtn w-1/3 md:w-1/5 border-emerald-600 bg-emerald-600">Update</button>
                        <button onClick={closeUpdate} className="inputBtn w-1/5 w-1/3 md:w-1/5 border-emerald-600 bg-emerald-600">Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
 
export default Card;