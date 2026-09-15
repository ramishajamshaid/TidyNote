import { useState, useEffect } from 'react'
import '../App.css'
import { Outlet } from 'react-router-dom'
import SidebarItem from '../components/SidebarItem'
import { PanelLeftClose, CirclePlus, LayoutGrid, Star, PencilSparkles, CircleCheckBig, Trash, Settings, Headset } from 'lucide-react'
import Header from '../components/Header'
import AddNoteModal from '../components/modals/AddNoteModal.jsx'
import api from '../api/api.js'
import { allNotesCount, favNotesCount, trashedNotesCount } from '../calculations.js'
import BottomNav from '../components/BottomNav.jsx'

function DashboardLayout() {
  const [isSidebarOpen, setSidebar] = useState(window.innerWidth >= 768)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState({})
  const [listItem, setListItem] = useState([])
  const [layout, setLayout] = useState("grid")

  useEffect(() => {
    getTodos();
    getUser();
  }, []);

  const getTodos = async () => {
    try {
      const res = await api.get("/todo/get-todos")
      if (res.data.success) {
        setListItem([...res.data.data])
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const getUser = async () => {
    try {
      const res = await api.get("/users/get-user")
      if (res.data.success) {
        setUser(res.data.data)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const setFavourite = async (currentFavourite, id) => {
    const isFavourite = !currentFavourite
    try {
      const res = await api.patch("/todo/set-favourite", { id, isFavourite })
      if (res.data?.success) {
        setListItem(prev => prev.map(item => item._id === id ? { ...item, isFavourite } : item))
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setLayout(window.innerWidth < 480 ? "list" : "grid")
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="flex flex-col tablet:flex-row h-screen"
      >
        <aside className={`${isSidebarOpen ? "w-65" : "w-14 overflow-hidden"} hidden bg-linear-to-br from-[#e6f3ff] to-[#f7eeff] tablet:flex flex-col h-full border-r border-border shrink-0 select-none transition-[width] duration-400 ease-in-out`}>
          <div className={`py-3 ${isSidebarOpen ? "px-6" : "px-3"} flex items-center justify-between`}>
            {isSidebarOpen && (<div className="flex items-center gap-1">
              <span className="font-semibold text-[20px] tracking-wide text-heading font-poppins">
                TidyNote
              </span>
              <span className="w-8 h-8 rounded-lg bg-purple-light flex items-center justify-center text-purple-dark">
                <PencilSparkles size={18} />
              </span>
            </div>)}
            <button
              className="text-text hover:text-description transition-colors cursor-pointer p-1 outline-none rounded-md hover:bg-black/5" title="Collapse Sidebar"
              onClick={() => setSidebar(!isSidebarOpen)}
            >
              <PanelLeftClose size={20} className={`${!isSidebarOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300 ease-in-out`} />
            </button>
          </div>

          {/* <!-- New Note Button Area --> */}
          <div className={`${isSidebarOpen ? "px-6" : "px-3"} flex justify-center items-center py-3`}>
            <button
              className={`w-full bg-purple-dark hover:bg-purple-deep text-white py-2 ${isSidebarOpen ? "px-4" : "px-0"} rounded-xl text-[14px] font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer`}
              onClick={() => setIsModalOpen(true)}
            >
              <CirclePlus size={18} className="shrink-0" />
              {isSidebarOpen && (<span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? "max-w-24 opacity-100" : "max-w-0 opacity-0"}`}>New Note</span>)}
            </button>
          </div>

          {/* <!-- Sidebar Navigation --> */}
          <div className="flex-1 px-3 py-2 space-y-6 overflow-x-hidden">

            {/* <!-- Main Nav Group --> */}
            <div>
              {isSidebarOpen && (<div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-subtle text-text">Menu</div>)}
              <nav className="space-y-0.5">
                <SidebarItem
                  to=""
                  label="All Notes"
                  icon={LayoutGrid}
                  count={allNotesCount(listItem)}
                  isSidebarOpen={isSidebarOpen}
                  from="all-notes"
                />
                <SidebarItem
                  to="favourites"
                  label="Favourites"
                  icon={Star}
                  count={favNotesCount(listItem)}
                  isSidebarOpen={isSidebarOpen}
                  from="favourites"
                />
                <SidebarItem
                  to="trash"
                  label="Trash"
                  icon={Trash}
                  count={trashedNotesCount(listItem)}
                  isSidebarOpen={isSidebarOpen}
                  from="trash"
                />
              </nav>
            </div>

            {/* <!-- Categories / Tags Group --> */}
            <div>
              {isSidebarOpen && (<div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-subtle text-text">General</div>)}
              <nav className="space-y-0.5">
                <SidebarItem
                  to="settings"
                  label="Settings"
                  icon={Settings}
                  count=""
                  isSidebarOpen={isSidebarOpen}
                />
                <SidebarItem
                  to="support"
                  label="Support"
                  icon={Headset}
                  count=""
                  isSidebarOpen={isSidebarOpen}
                />
              </nav>
            </div>

          </div>

          {/* <!-- User Profile Section at Bottom --> */}
          <div className="p-3 border-t border-purple-light overflow-hidden">
            <div className={`flex items-center justify-between ${isSidebarOpen ? "px-1" : "px-0"} py-1 rounded-xl hover:bg-black/3 transition-colors cursor-pointer group`}>
              <div className="flex items-center gap-1 min-w-0">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-sage/20 text-sage font-semibold flex items-center justify-center text-sm border border-sage-border overflow-hidden">
                    <img src={user?.avatar} alt="user profile" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div
                  className={`flex flex-col justify-center min-w-0 overflow-hidden transition-all duration-300 ${isSidebarOpen ? "max-w-48 opacity-100" : "max-w-0 opacity-0"}`}
                >
                  <span className="whitespace-nowrap text-heading text-[0.85rem]">
                    {user?.fullname}
                  </span>

                  <span className="whitespace-nowrap truncate text-[0.75rem] text-description">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex flex-col flex-1 min-w-0 bg-[radial-gradient(circle_at_top,#f1e9f9_0%,#FAF7FF_25%,#FFFFFF_65%)]">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <main className="flex-1 overflow-auto">
            <Outlet context={{ listItem, setListItem, setFavourite, layout, setLayout, searchQuery, setSearchQuery }} />
          </main>
        </div>
        {/* <!-- Bottom Nav  --> */}
        <div className="fixed bottom-0 w-full bg-linear-to-br from-[#e6f3ff] to-[#f7eeff] rounded-t-2xl tablet:hidden px-3 space-y-6 overflow-x-hidden">
          <nav className="flex justify-center items-center gap-1.5 mobile:gap-3 px-4 py-1">
            <BottomNav
              to=""
              label="Notes"
              icon={LayoutGrid}
            />
            <BottomNav
              to="favourites"
              label="Favourites"
              icon={Star}
            />
            <button
              className="bg-purple-dark hover:bg-purple-deep text-white p-1.5 mobile:p-2 rounded-full text-[14px] font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-2xl"
              onClick={() => setIsModalOpen(true)}
            >
              <CirclePlus className="w-5 h-5 mobile:w-6 mobile:h-6 shrink-0" />
            </button>
            <BottomNav
              to="completed"
              label="Completed"
              icon={CircleCheckBig}
            />
            <BottomNav
              to="trash"
              label="Trash"
              icon={Trash}
            />
          </nav>
        </div>
        <AddNoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setListItem={setListItem}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  )
}

export default DashboardLayout
