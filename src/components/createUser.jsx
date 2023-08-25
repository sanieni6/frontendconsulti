import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createUser } from '../redux/usersSlice';
import { selectJWT } from '../redux/store';
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
    const navigate = useNavigate();
    const jwt = useSelector(selectJWT);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    const inputs = [
        { id: 0, placeholder: 'Firstname', type: 'text', value: firstname, action: setFirstname },
        { id:1, placeholder: 'Lastname', type: 'text', value: lastname, action: setLastname },
        { id:2, placeholder: 'Age', type: 'number', value: age, action: setAge },
        { id:3, placeholder: 'Email', type: 'email', value: email, action: setEmail },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser(firstname, lastname, age, email, jwt);
        navigate('/');
      };


    return (
        <div>
            <h1>Create a new user</h1>
            <form onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <input
                        key={input.id}
                        value={input.value}
                        type={input.type}
                        onChange={(e) => input.action(e.target.value)}
                        placeholder={input.placeholder}
                        required
                    />
                ))}
                <button type="submit">Create</button>
            </form>
        </div>


    );

};

export default CreateUser;