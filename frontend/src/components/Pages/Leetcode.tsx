import { useEffect, useState } from 'react';
import '../../styles.css'
import Card from '../Asset/Card';
import axios from 'axios';
import leetcodeIcon from '../Asset/images/leetcode.png'
import Modal from 'react-modal';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
    name: string
    difficulty: string
    notes: string
    type: string
    status: string
    link: string
}

const Leetcode = (): JSX.Element => {
    const {register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/leetcodeproblems", data);
            console.log("Problem added:", response.data);
            setProblems((prevProblems) => [...prevProblems, response.data]);
            closeModal(); 
        } catch (error) {
            console.error("There was an error adding the problem:", error);
        }

    }

    interface Problem {
        id: string,
        difficulty: string,
        name: string,
        notes: string,
        type: string,
        status: string,
        link: string
    }
    const [problems, setProblems] = useState<Problem[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [toDo, setToDo] = useState<Problem[]>([])
    const [attempted, setAttempted] = useState<Problem[]>([])
    const [completed, setCompleted] = useState<Problem[]>([])
    const [showToDo, setShowToDo] = useState<boolean>(true);
    const [showAttempted, setShowAttempted] = useState<boolean>(false);
    const [showCompleted, setShowCompleted] = useState<boolean>(false);

    useEffect(()=> {
        axios.get("http://localhost:8080/api/v1/leetcodeproblems")
            .then(res => {
                setProblems(res.data)
            })
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        const toDoList = problems.filter((problem) => problem.status === "To-Do")
        const attemptedList = problems.filter((problem) => problem.status === "Attempted")
        const completedList = problems.filter((problem) => problem.status === "Completed")
        setToDo(toDoList)
        setAttempted(attemptedList)
        setCompleted(completedList)
    },[problems])

    const openModal = () => {
        setModal(true)
        reset();
    }

    const closeModal = () => {
        setModal(false)
    }

    const handleToDo = () => {
        setShowToDo(true)
        setShowAttempted(false)
        setShowCompleted(false)
    }

    const handleAttempted = () => {
        setShowToDo(false)
        setShowAttempted(true)
        setShowCompleted(false)
    }

    const handleCompleted = () => {
        setShowToDo(false)
        setShowAttempted(false)
        setShowCompleted(true)
    }
    
    return (
        <div className="text-black-400 text-xl font-bold"> 
            <div className="flex justify-center items-center">
                <p className="border-b border-gray-500 font-body p-2 text-4xl">Leetcode</p>
                <img src={leetcodeIcon} className="w-9 h-9" ></img>
            </div>

            <div className="flex justify-center">
                <button className={`rounded-3xl p-2 m-2 border-2 border-black transition ease-in duration-500 ${showToDo=== true ? 'bg-emerald-700' : 'bg-white'}`} onClick={handleToDo}>To-Do</button>
                <button className={`rounded-3xl p-2 m-2 border-2 border-black transition ease-in duration-500 ${showAttempted === true ? 'bg-emerald-700' : 'bg-white'}`} onClick={handleAttempted}>Attempted</button>
                <button className={`rounded-3xl p-2 m-2 border-2 border-black transition ease-in duration-500 ${showCompleted === true ? 'bg-emerald-700' : 'bg-white'}`} onClick={handleCompleted}>Completed</button>
            </div>
            
            {showToDo &&
            <div>
                <div className="flex items-center">
                    <p className="font-body ml-5 text-3xl">To-Do: ({toDo.length})</p>
                    <button className="bg-white rounded-3xl p-2 m-2 border-2 border-black hover:bg-emerald-700 transition ease-in duration-500" onClick={openModal}>Add problem</button>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {toDo && toDo.map((problem) => (
                        <Card problem={problem} setProblems={setProblems} />
                    ))}
                </div>
            </div>}
            {showAttempted &&   
            <div>
                <div className="flex items-center">
                    <p className="font-body ml-5 text-3xl">Attempted: ({attempted.length})</p>
                    <button className="bg-white rounded-3xl p-2 m-2 border-2 border-black hover:bg-emerald-700 transition ease-in duration-500" onClick={openModal}>Add problem</button>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {attempted && attempted.map((problem) => (
                        <Card problem={problem} setProblems={setProblems} />
                    ))}
                </div>
            </div>}
            {showCompleted && 
            <div>
                <div className="flex items-center">
                    <p className="font-body ml-5 text-3xl">Completed:  ({completed.length})</p>
                    <button className="bg-white rounded-3xl p-2 m-2 border-2 border-black hover:bg-emerald-700 transition ease-in duration-500" onClick={openModal}>Add problem</button>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2">
                    {completed && completed.map((problem) => (
                        <Card key={problem.id} problem={problem} setProblems={setProblems} />
                    ))}
                </div>
            </div>
            }
            <Modal ariaHideApp={false} isOpen={modal} onRequestClose={closeModal} className="flex flex-col justify-center w-10/12 bg-gray-500 rounded-2xl h-5/6" overlayClassName="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <p className="text-3xl font-body text-center font-bold">Add Leetcode Problem</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-10/12 sm:w-11/12 gap-4 ml-10">
                    <label className="inputLabel">Name</label>
                    <input {...register("name", { required: true})} autoComplete="off" className="inputClass" />
                    {errors.name && <span className="inputLabel text-red-700 font-bold">Please input a name</span>}
                    <label className="inputLabel">Difficulty</label>
                    <select {...register("difficulty")}  className="inputClass">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <label className="inputLabel">Type (Based on Neetcode)</label>
                    <select {...register("type", { required: 'Please select a type' })} defaultValue="" className="inputClass">
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
                    <select {...register("status")}  className="inputClass">
                        <option value="To-Do">To-do</option>
                        <option value="Attempted">Attempted</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <label className="inputLabel">Link</label>
                    <input {...register("link")} className="inputClass" />
                    <label className="inputLabel">Notes</label>
                    <textarea {...register("notes")} style={{ resize:'none'}}  className="inputClass h-20"/>
                    <div className="flex justify-center gap-5 sm:gap-24">
                        <button type="submit" className="inputBtn w-1/3 md:w-1/5">Update</button>
                        <button onClick={closeModal} className="inputBtn w-1/5 w-1/3 md:w-1/5">Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
 
export default Leetcode;