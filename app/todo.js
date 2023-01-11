'use client'
import { AiOutlineDelete } from 'react-icons/ai';


import {useEffect, useState} from "react";

export default function Todo(){

    const [value, setValue] = useState({
        title: '',
        email: ''
    })

    const [alert, setAlert] = useState('')

    const [data, setData] = useState([])

    function handleChange(e){
        setValue({...value, [e.target.type == 'text'? 'title' : 'email']: e.target.value})
    }

    async function handleForm(e){
        e.preventDefault()

        if(value.title.trim() && value.email.trim()){

            const createTodo =  await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': 'admin'
                },
                body:JSON.stringify(value)
            })
            const res = await createTodo.json()
            console.log(res)

            if(res.status === 'success'){
                setAlert('success')

                setTimeout(() => {
                    setAlert('')
                }, 2000)
            }
            setValue({
                title: '',
                email: ''
            })


        } else {
            console.log('Invalid Form')
        }
    }

    async function fetchData(){
        const fetchData = await fetch('/api/todos', {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'authtoken': 'admin'
            }
        })
        const data = await fetchData.json()

        setData(data.data)
    }

    async function handleDelete(e) {
        if (e.target.id){
            const deleteData = await fetch('/api/todos', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': 'admin'
                },
                body: JSON.stringify(e.target.id)
            })
            const res = await deleteData.json()
            console.log(res)
            if(res.status === 'deleted'){
                setAlert('deleted')

                setTimeout(() => {
                    setAlert('')
                }, 2000)
            }
        }
    }

    useEffect(()=> {
        fetchData()
    }, [alert])

    return(
        <> <br/>
            <form action="" onSubmit={handleForm}>
                <input type="text" value={value.title} onChange={handleChange}/> <br/> <br/>
                <input type="email" value={value.email} onChange={handleChange}/> <br/> <br/>
                <button>Add</button>
            </form>

            <br/>
            <div className={alert? 'alert color' : undefined }>
                {alert? <p> {alert == 'success'? 'Todo Added' : 'Deleted'} </p> : undefined}
            </div>
            <br/>
            <div className="todoLists">
                {data.map((d) => {
                    return(
                        <div key={d.id} className={'todo'}>
                            <p>{d.title}</p>
                            <p>{d.email}</p>

                            <div className="icon" onClick={handleDelete}>
                                <AiOutlineDelete size={20} id={d.id}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}