import { useEffect, useState } from 'react';
import '../../styles.css'
import Card from '../Asset/Card';
import axios from 'axios';
import leetcodeIcon from '../Asset/images/leetcode.png'
import Modal from 'react-modal';

const Leetcode = () => {
    const [problems, setProblems] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(()=> {
        axios.get("http://localhost:8080/api/v1/leetcodeproblems")
            .then(res => {
                setProblems(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }
    // todo: finish the add problem modal 
    
    return (
        <div className="text-black-400 text-xl font-bold"> 
            <div className="flex justify-center items-center">
                <p className="border-b border-gray-500 font-body p-2 text-4xl">Leetcode</p>
                <img src={leetcodeIcon} className="w-9 h-9" ></img>
            </div>
            <div className="flex justify-center">
                <button className="bg-white rounded-2xl p-1 m-2" onClick={openModal}>Add problem</button>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2">
                {problems && problems.map((problem) => (
                    <Card problem={problem} />
                ))}
            </div>
            <Modal isOpen={modal} onRequestClose={closeModal}>
                <div>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </Modal>
        </div>
    );
}
 
export default Leetcode;