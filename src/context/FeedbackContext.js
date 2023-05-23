import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10,
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 9,
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 7,
        },
    ]);

    const [ feedbackEdit, setFeedbackEdit ] = useState({
        item: {},
        edit: false
    })

    // Set item to be edited
    const editFeedback = (item) => {
        setFeedbackEdit({item, edit: true})
    }

    // Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = parseInt(uuidv4());
        setFeedback([newFeedback, ...feedback]);
        //console.log(newFeedback.id);
    };

    // Delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure?')) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                deleteFeedback,
                addFeedback,
                editFeedback
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
