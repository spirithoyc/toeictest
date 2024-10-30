import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function Quiz() {
    const [searchParams] = useSearchParams();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);

    // Load the quiz data
    useEffect(() => {
        const course = searchParams.get('course');
        import(`../vocabulary/vo_${course}.json`)

            .then((data) => {
                const allWords = data.vocabulary;
                const selectedQuestions = shuffleArray(allWords).slice(0, 10);
                setQuestions(selectedQuestions);
                setUserAnswers(selectedQuestions.reduce((acc, item) => {
                    acc[item.word] = '';
                    return acc;
                }, {}));
            })
            .catch(error => console.error('Failed to load vocabulary data:', error));
    }, [searchParams]);

    // Helper function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Handle input change
    const handleInputChange = (word, value) => {
        setUserAnswers(prev => ({ ...prev, [word]: value }));
    };

    // Submit answers
    const handleSubmit = (e) => {
        e.preventDefault();
        let newScore = 0;
        questions.forEach(q => {
            if (q.translation === userAnswers[q.word]) {
                newScore += 1;
            }
        });
        setScore(newScore);
    };

    return (
        <div style={{padding:"20px"}}>
            <h1>01A Quiz</h1>
            {score !== null && <h2>Your Score: {score} / 10</h2>}
            <form onSubmit={handleSubmit} style={{padding:"20px"}}>
                {questions.map((question, index) => (
                    <div key={index} style={{margin:"10px"}}>
                        <span style={{marginRight:"10px"}}>{question.word}</span>
                        <input
                            type="text"
                            value={userAnswers[question.word]}
                            onChange={(e) => handleInputChange(question.word, e.target.value)}
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Quiz;
