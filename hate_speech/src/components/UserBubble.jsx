export default function UserBubble({ message }) {
    return (
        <div className="flex justify-end mb-6 px-2">
            <div className="bg-black rounded-2xl px-5 py-4 text-white max-w-xl">
                {message}
            </div>
        </div>
    );
}