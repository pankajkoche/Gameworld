import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import Flex from "../layouts/Flex";
import { navBarList } from "../../staticData";
import { motion } from "framer-motion";

const Header = () => {
    const [showMenu, setShowMenu] = useState(true);
    const [sidenav, setSidenav] = useState(false);
    const [category, setCategory] = useState(false);
    const [brand, setBrand] = useState(false);
    const location = useLocation();
    useEffect(() => {
      let ResponsiveMenu = () => {
        if (window.innerWidth < 667) {
          setShowMenu(false);
        } else {
          setShowMenu(true);
        }
      };
      ResponsiveMenu();
      window.addEventListener("resize", ResponsiveMenu);
  }, []);

    return (
        <div className='w-full h-16 bg-white sticky top-0 z-50  border-b-[1px] border-b-gray-200'>
            <nav className='h-full px-4 max-w-container mx-auto relative'>
                <Flex className='flex items-center justify-between h-full'>
                    <Link to='/'>
                        <div className=" font-bold">
                            GameWorld
                        </div>
                    </Link>

                    <div>
                    {showMenu && (
                        <motion.ul
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center w-auto z-50 p-0 gap-2"
                        >
                            <>
                            {navBarList.map(({ _id, title, link }) => (
                                <NavLink
                                key={_id}
                                className="flex font-normal hover:font-bold w-20 h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626]   hoverEffect last:border-r-0"
                                to={link}
                                state={{ data: location.pathname.split("/")[1] }}
                                >
                                <li>{title}</li>
                                </NavLink>
                            ))}
                            </>
                        </motion.ul>
                    )}
                    <HiMenu 
                        onClick={()=>setSidenav(!sidenav)}
                        className=" inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
                    />
                    {sidenav && (
                        <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                            <motion.div
                               initial={{x:-300, opacity:0}}
                               animate={{x:0,opacity:1}}
                               transition={{duration:0.5}}
                               className="w-[80%] h-full relative"
                            >
                                <div className="w-full h-full bg-black p-6">
                                    <h1>GameWorld</h1>
                                    <ul className="text-gray-200 flex flex-col gap-2">
                                        {navBarList.map((item) => (
                                            <li
                                            className="font-normal hover:font-bold items-center text-lg text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                                            key={item._id}
                                            >
                                            <NavLink
                                                to={item.link}
                                                state={{ data: location.pathname.split("/")[1] }}
                                                onClick={() => setSidenav(false)}
                                            >
                                                {item.title}
                                            </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <span className="w-8 h-8 border-[1px] border-gray-200 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red"
                                 onClick={()=>setSidenav(false)}>
                                    <MdClose/>
                                </span>

                            </motion.div>
                        </div>
                    )}

                    </div> 
                </Flex>

            </nav>
        </div>
    );
};

export default Header;