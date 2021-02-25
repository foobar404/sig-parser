import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import {mix,useAxios} from "../util"
import {Form,Input} from "../components"
import {IoMdPerson,IoMdPeople,IoIosMail,IoMdCall,IoMdTrash,IoIosPaperPlane} from "react-icons/io"


const Style = styled.main`
    ${mix.p(7,2)}
    ${mix.col("flex-start","center")}
    
    *{overflow:hidden;}

    nav{
        span{
            ${mix.m(1,5)}
            display:inline-block;
            height:70px;
            width:4px;
            background:#ddd;
        }

        button:hover{
            color:steelblue;
        }

        .active{color:steelblue}
    }

`


export function Root() {
    let [show,setShow] = useState("list")

    return (
        <Style>
            <nav>
                <button onClick={()=>setShow("add")}
                  className={`${show==="add"?"active":""}`}>
                    <h1>Add <IoMdPerson/></h1>
                </button>

                <span></span>

                <button onClick={()=>setShow("list")}
                  className={`${show==="list"?"active":""}`}>
                    <h1>List <IoMdPeople/></h1>
                </button>
            </nav>

            {show === "add" &&
            <AddPeople />       
            }

            {show === "list" &&
            <ListPeople/>
            }
        </Style>
    )
}


const AddPeopleStyle = styled.section`
    ${mix.p(5,6)}
    ${mix.col("center","stretch")}
    min-width:550px;

    form{
        ${mix.col()}

        button{
            ${mix.p(3,6)}
            min-height:40px;
            border-radius:5px;
            background:#31a4f7;
            color:white;
        }
        button:hover{
            background:#1091ef;
        }
    }

    aside{
        ${mix.m(4,1)}
        ${mix.p(5,6)}
        font-weight:bold;
        background:hsl(153deg 78% 47%);
        border-radius:5px;
        color:white;
    }
`


function AddPeople(){
    let axios = useAxios()
    let [message,setMessage] = useState("")

    function onSubmit(values){
        axios.post("/persons",values).then(res=>{
            setMessage("Success: person created")
        }).catch(console.log)
    }
    
    return (
        <AddPeopleStyle>
            <Form onSubmit={onSubmit}>
                <Input required name="name" type="text" placeholder="Full Name"><IoMdPerson/></Input>
                <Input required name="email" type="email" placeholder="Email Address"><IoIosMail/></Input>
                <Input required name="phone" type="tel" placeholder="Phone Number"><IoMdCall/></Input>
                <button>Submit<IoIosPaperPlane/></button>
            </Form>
            {message && <aside>{message}</aside>}
        </AddPeopleStyle>
    )
}


const ListPeopleStyle = styled.section`
    ${mix.p(5,6)}
    ${mix.col("center","stretch")}
    min-width:550px;

    #loading{align-self:center}

    header{
        display:grid;
        grid-template-columns:1fr 1fr 1fr .7fr;
    }

    &>div{
        ${mix.m(4,1)}
        display:grid;
        grid-template-columns:1fr 1fr 1fr .7fr;
        grid-gap:10px;

        *{${mix.col("center","flex-start")}}

        p{
            border:2px solid #eee;
        }
    }

    a{
        text-decoration:underline;
        color:steelblue;
    }

    button{
        ${mix.col()}
        height:40px;
        width:40px;
        border-radius:50%;
        border:2px solid rgba(0,0,0,0);
        background:hsl(6deg 100% 50%);
        color:white;
        box-shadow: 3px 0px 3px 0px #0000003d;
        transition:.25s ease;

        svg{
            height:60%;
            width:auto;
        }
    }
    button:hover{
        color:hsl(6deg 100% 50%);
        background:white;
        border:2px solid hsl(6deg 100% 50%);
    }
`


function ListPeople(){
    let axios = useAxios()
    let [people,setPeople] = useState([])

    useEffect(()=>{
        axios.get("/persons").then(res=>{
            setPeople(res.data.data)
        }).catch(console.log)
    },[])

    function remove(id,index){
        axios.delete("/persons",{data:{ids:`${id}`}}).then(console.log).catch(console.log)
        setPeople(peps=>{
            return peps.filter((pep,i)=>{
                return i !== index 
            })
        })
    }

    return (
        <ListPeopleStyle>
            {!!people.length &&
            <>
            <header>
                <h3>Name <IoMdPerson/></h3>
                <h3>Email <IoIosMail/></h3>
                <h3>Phone <IoMdCall/></h3>
                <h3>Delete <IoMdTrash/></h3>
            </header>

            {people.map((person,i)=>{
                return  (
                <div key={person.id}>
                    <p><a target="_blank" href={`https://austinmichaud.pipedrive.com/person/${person.id}`}>{person.name}</a></p>
                    <p>{person.email[0].value}</p>
                    <p>{person.phone[0].value}</p>
                    <button onClick={()=>remove(person.id,i)}><IoMdTrash/></button>
                </div>)
            })}
            </>}

            {!people.length &&
            <h2 id="loading">Loading...</h2>
            }
        </ListPeopleStyle>  
    )
}
