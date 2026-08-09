import BotBubble from "./BotBubble";
function formatTime(seconds) {

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;

}
export default function ResultCard({ result }) {

    if (!result) return null;

    return (

        <BotBubble>

            {result.blocked ? (

                <>

                    <h2 className="text-red-500 text-xl font-bold">

                         User Blocked

                    </h2>

                    <p className="mt-4">

                        You have been temporarily blocked because of repeated hate speech.

                    </p>

                    <p className="mt-2">

                        Remaining Time:

                        <span className="font-bold ml-2">

                            {formatTime(result.remaining_seconds)}

                        </span>

                    </p>

                </>

            ) : result.safe ? (

                <>

                    <h2 className="text-green-800 text-xl font-bold">

                        Safe Message

                    </h2>

                    <p className="mt-3">

                        No hate speech detected.

                    </p>

                </>

            ) : (

                <>

                    <h2 className="text-red-500 text-xl font-bold">

                        Hate Speech Detected

                    </h2>

                    <div className="mt-4 space-y-3">

                        <p>

                            <span className="font-semibold">

                                Severity:

                            </span>

                            <span className="ml-2 capitalize">

                                {result.severity}

                            </span>

                        </p>

                        <div>

                            <p className="font-semibold mb-2">

                                Categories

                            </p>

                            <div className="flex flex-wrap gap-2">

                                {result.categories.map((cat) => (

                                    <span
                                        key={cat}
                                        className="
                                            px-3
                                            py-1
                                            rounded-full
                                            bg-red-900/30
                                            text-red-300
                                            text-sm
                                        "
                                    >

                                        {cat}

                                    </span>

                                ))}

                            </div>

                        </div>

                        <p>

                            <span className="font-semibold">

                                Violations:

                            </span>

                            <span className="ml-2">

                                {result.violations} / 3

                            </span>

                        </p>

                    </div>

                </>

            )}

        </BotBubble>

    );

}