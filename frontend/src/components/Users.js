import React, { useState, useEffect } from 'react'

const API = process.env.REACT_APP_API;

export const Users = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [editing, setEditing] = useState(false)
    const [id, setId] = useState('')

    const [users, setUsers] = useState([])

    const handleSumbit = async (e) => {
        e.preventDefault();
        if (!editing) {

            const res = await fetch(`${API}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone
                })
            })
            const data = await res.json();
            console.log(data);
        } else {
            try {
                console.log('Edit User ID:', id);

                const res = await fetch(`${API}/users/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone
                    })
                })

                const data = await res.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }

            setEditing(false);
            setId('');
        }

        await getUsers();

        setName('');
        setEmail('');
        setPhone('');

    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data)
    }

    useEffect(() => {
        getUsers();
    }, [])

    const editUser = async (id) => {
        console.log('Edit User ID:', id);
        const res = await fetch(`${API}/user/${id}`);
        const data = await res.json();

        console.log('Response Data:', data);

        setEditing(true)
        setId(data.id)

        setName(data.name)
        setEmail(data.email)
        setPhone(data.phone)
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete it?')
        if (userResponse) {
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data);
            await getUsers();
        }
    }

    return (
        <div className='row'>
            <div className='col-md-4'>
                <form onSubmit={handleSumbit} className='card card-body'>
                    <div className='form-group mb-3'>
                        <input type='text'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className='form-control'
                            placeholder='Name'
                            autoFocus
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <input type='email'
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className='form-control'
                            placeholder='Email'
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <input type='number'
                            onChange={e => setPhone(e.target.value)}
                            value={phone}
                            className='form-control'
                            placeholder='Phone'
                        />
                    </div>
                    <button className='btn btn-primary btn-block'>
                        {editing ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className='col-md-8'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, id) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button
                                        className='btn btn-secondary btn-sm m-1'
                                        onClick={() => {
                                            console.log(user._id);
                                            editUser(user._id)
                                        }}
                                    >Edit
                                    </button>
                                    <button
                                        className='btn btn-danger btn-sm btn-block m-1'
                                        onClick={() => deleteUser(user._id)}
                                    >Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
