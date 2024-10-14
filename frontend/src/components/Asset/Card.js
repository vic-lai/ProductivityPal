import '../../styles.css'
const Card = ({problem}) => {
    const {difficulty, name, notes, type, status, link} = problem
    const difficultyClass = difficulty === 'Easy' ? 'bg-green-400' : difficulty === 'Medium' ? 'bg-yellow-400' : 'Hard' ? 'bg-red-500': 'bg-white-500';
    const baseClass = "font-body text-sm p-2 absolute bottom-0 w-full"
    return (
        <div className="bg-white shadow:sm rounded m-5 text-center hover:shadow-lg relative pb-10">
            <p className="p-5 font-body">{name}</p>
            <div className={`${difficultyClass} ${baseClass}`}>
                <span>{difficulty}</span>
            </div>
        </div>
    );
}
 
export default Card;