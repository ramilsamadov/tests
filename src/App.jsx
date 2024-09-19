import React, { useState, useEffect } from 'react'; // Yalnızca bir kez import et
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AccountTable from './components/AccountTable';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import UpdateCustomer from './components/UpdateCustomer';


// import { getAllCustomers } from './api.js';


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar durumu
  const [posts, setPosts] = useState([]);

  // Sidebar'ı açma ve kapatma fonksiyonu
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // State'i true <=> false yaparak aç/kapa
  };


  // useEffect(() => {
  //   const getCustomers = async () => {
  //     try {
  //       const customers = await getAllCustomers();
  //       setPosts(customers)
  //       // console.log(customers);
        
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getCustomers();
  // }, [])

  // console.log("posts", posts);
  return (
    <div className="App">
      <Header />
      {/* Hamburger menü: Sidebar aç/kapa */}
      <div className="hamburger" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="main">
        {/* Sidebar'ı isOpen prop'u ile kontrol ediyoruz */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <AccountTable />
        {/* <CustomerList /> */}

        {/* <ul> */}
        {/* {posts.map((post) =>{
          console.log(post)
          return (
            <>
              <li>Post Title: {post.title}</li>
              <li>Post Body: {post.body}</li>
            </>
          )
        })} */}
        
        {/* // (
        //   <li key={post.id}>{posts.title}</li>
        // ))} */}
      {/* </ul> */}
      </div>
    </div>
  );
}

export default App;
