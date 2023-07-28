import "./Users.css"
import { useEffect, useState } from "react"
import {userDetails, addUserDetails,deleteUserById,updateUserById} from "./Services/axiosAPI"

const Users = () =>{
    const [users,setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newWebsite,setWebsite] = useState("")
    const [newCity,setNewCity] = useState("");
    const [street,setStreet] = useState("");
    const [suite,setSuite] = useState("");
    const [zipcode,setzipcode] =useState('')
    const [newCompany, setNewCompany] = useState("");
    const [updateUserId, setUpdateUserId] = useState("");
    const [showDailogue, setShowDailogue] = useState(false);
  
    useEffect(() =>{
        getUserDetails();
    },[])

    const getUserDetails = async() =>{
        const response = await userDetails();
        if(response.data){
            setUsers(response.data)
        } 
    }


    const addUser = async (e) => { //this will add the new data in server using the data coming from input
        e.preventDefault()
            try {
                const payload = {
                    name : newName,
                    phone : newNumber,
                    email : newEmail,
                    username : newUsername,
                    address: {
                        suite:suite,
                        street:street,
                        city:newCity,
                        zipcode: zipcode
                    },
                    company: newCompany,
                    website: newWebsite
                };
                setShowDailogue(true)
                const response = await addUserDetails(payload);
                // if(response.data){
                //     setNewName("");
                //     setNewNumber("");
                //     setNewEmail('');
                //     setNewCity("")
                //     setNewUsername("");
                //     setNewCompany("");
                //     setWebsite("");
                //     setNewCity("");
                //     setSuite("");
                //     setStreet("");
                //     setzipcode("");
                //     getUserDetails();
                // }
            } catch(err){
                 err = "data not found"
                return err;
            }

    }
    const resetData = () => {
        setNewName("");
        setNewNumber("");
        setNewEmail('');
        setNewCity("")
        setNewUsername("");
        setNewCompany("");
        setWebsite("");
        setNewCity("");
        setSuite("");
        setStreet("");
        setzipcode("");
        getUserDetails();
        setShowDailogue(false)
    }

    const updateUserDetails = async() =>{
        if(updateUserId){
            const payload = {
                name : newName,
                phone : newNumber,
                email : newEmail,
                username : newUsername,
                address: {
                    suite:suite,
                    street:street,
                    city:newCity,
                    zipcode: zipcode
                },
                company: newCompany,
                website: newWebsite
            };
            const response = await updateUserById(updateUserId,payload);
            // if(response.data){
            //     setNewName("");
            //     setNewNumber("");
            //     setNewEmail('');
            //     setNewCity("")
            //     setNewUsername("");
            //     setNewCompany("");
            //     setWebsite("");
            //     setNewCity("");
            //     setSuite("");
            //     setStreet("");
            //     setzipcode("")
            // }
        }
    }

    const setUserDetails = (user) =>{
                setNewName(user.name);
                setNewNumber(user.phone);
                setNewEmail(user.email);
                setNewCity(user.address.city)
                setNewUsername(user.username);
                setNewCompany(user.company.name);
                setWebsite(user.website);
                setSuite(user.address.suite);
                setStreet(user.address.street);
                setUpdateUserId(user.id)
                setzipcode(user.address.zipcode)
                
    }
    const deleteUser = async (userId)=>{
        const response = await deleteUserById(userId)
        if(response.data){
            console.log(response.data)
            getUserDetails();
        }
    }
    return(
        <div>
            <div className="container-form">
            <form className="form" onSubmit={addUser}>
                <h4>User Form</h4>
                <hr/>
                {/*user details input gettung from hare */}
                
                <div><span>Name:</span><input type="text" placeholder="Enter Name" value={newName} onChange={(e)=> setNewName(e.target.value)} required /> 
                 </div>
                 <div><span>Phone :</span> 
                 <input type="tel" placeholder="Enter Number" value={newNumber} onChange={(e)=> setNewNumber(e.target.value)} required /> 
                 </div>
                 <div><span>Email :</span> 
                 <input type="email" placeholder="Enter email" value={newEmail} onChange={(e)=> setNewEmail(e.target.value)} required /> 
                 </div>
                 <div><span>Username :</span> 
                 <input type="text" placeholder="Enter Username" value={newUsername} onChange={(e)=> setNewUsername(e.target.value)} required /> 
                 </div><h4>Address</h4>
                 <div><div>suite :</div> 
                 <input type="text" placeholder="city" value={suite} onChange={(e)=> setSuite(e.target.value)} required />
                 <div>street :</div> 
                 <input type="text" placeholder="city" value={street} onChange={(e)=> setStreet(e.target.value)} required />
                 <div>city :</div> 
                 <input type="text" placeholder="city" value={newCity} onChange={(e)=> setNewCity(e.target.value)} required />
                 <div>zipcode :</div> 
                 <input type="text" placeholder="city" value={zipcode} onChange={(e)=> setzipcode(e.target.value)} required />
                 </div><h4>Company Details</h4>
                 <div><span>Company Name :</span> 
                 <input type="text" placeholder="Enter Company Name" value={newCompany} onChange={(e)=> setNewCompany(e.target.value)} required /> 
                 </div>
                 <div><span>Website :</span> 
                 <input type="text" placeholder="site name"value={newWebsite} onChange={(e)=> setWebsite(e.target.value)} required /> 
                 </div>
                <button type="submit">Submit</button><button onClick={updateUserDetails}>Update Details</button><button onClick={resetData}>Reset</button>
            </form>
            <div>
            </div>
            </div>
          {showDailogue && <dialog className="dailogueBox" open> <h3>User Details</h3>
          <div><b>ID :</b> {updateUserId}</div>        
                        <div><b>Name :</b> {newName}</div>
                        <div><b>Phone :</b> {newNumber}</div>
                        <div><b>Email:</b> {newEmail}</div>
                        <div><b>Username:</b> {newUsername}</div>
                        <div><b>Address:</b><span> {suite},{street},{newCity},{zipcode}</span> </div>
                        <div><b>Company Name :</b> {newCompany}</div>
                        <div><b>Website :</b> {newWebsite}</div>
          <button onClick={()=> setShowDailogue(false)}>Close</button>
          </dialog>}
        <div className="card-body">
            
            {!!users &&
                users.map((user,index)=>(
                    <div className="card" key={index}>
                        <h3>User Details</h3>
                        <div><b>Name :</b> {user.name}</div>
                        <div><b>Phone :</b> {user.phone}</div>
                        <div><b>Email:</b> {user.email}</div>
                        <div><b>Username:</b> {user.username}</div>
                        <div><b>Address:</b><span> {user.address.suite},{user.address.street},{user.address.city},{user.address.zipcode}</span> </div>
                        <div><b>Company Name :</b> {user.company.name}</div>
                        <div><b>Website :</b> {user.website}</div>
                        <button onClick={()=>setUserDetails(user)} >Edit</button> <button onClick={()=>deleteUser(user.id)}>Delete</button>
                    </div>
                ))
            }
        </div>    
        </div>
        
    )
}

export default Users