import trello from '../assets/trello.png';

const Loader = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                <img src={trello} alt="Trello" className="w-20 h-20" />
            </div>
        </div>
    </div>
    );
};

export default Loader;