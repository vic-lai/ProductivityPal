import preview from "../Asset/images/preview.png"
import preview2 from "../Asset/images/preview2.png"
import { motion } from "framer-motion";

const Home = (): JSX.Element => {
    return (
        <div className="flex justify-center flex-col items-center mt-10">
            <p className="font-body font-bold text-6xl">ProductivityPal</p>
            <p className="font-body text-4xl p-5">Study and keep track of your leetcode problems more efficiently</p>
            <div className="max-w-[1000px] flex">
                <motion.img src={preview} alt='leetcodeImg' className="border border-4 border-black rounded" initial={{ x: '-100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}/>
            </div>
            <p className="font-body text-4xl p-5">Organize your job applications all in one place</p>
            <div className="max-w-[1000px] flex mb-10">
                <motion.img src={preview2} alt='leetcodeImg' className="border border-4 border-black rounded" initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}/>
            </div>
        </div>
    );
}
 
export default Home;