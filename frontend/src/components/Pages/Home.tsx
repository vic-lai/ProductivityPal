import preview from "../Asset/images/preview.png"

const Home = (): JSX.Element => {
    return (
        <div className="flex justify-center flex-col items-center mt-10">
            <p className="font-body font-bold text-6xl">ProductivityPal</p>
            <p className="font-body text-4xl">Study and keep track of your leetcode problems more efficiently!</p>
            <img src={preview} className="border border-black border-4 rounded max-h-[400px] mt-10"></img>
        </div>
    );
}
 
export default Home;