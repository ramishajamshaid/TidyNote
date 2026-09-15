import React, { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import TodoItem from '../components/TodoItem'
import { formateDate } from '../calculations'
import PageHeader from '../components/PageHeader'

function Favourites() {
  const navigate = useNavigate()
  const { listItem, setFavourite, layout, setLayout, searchQuery } = useOutletContext()

  const favouriteNotes = listItem.filter(item => item.isFavourite && !item.isTrashed)
  const filteredFavouriteNotes = favouriteNotes.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())) || favouriteNotes;

  return (
    <div className="flex flex-col justify-start items-center gap-4 w-full py-2 px-6 mt-12 tablet:mt-0 mb-18 tablet:mb-0">
      <PageHeader
        title="Favourites"
        description="Your most important notes, all in one place."
        layout={layout}
        setLayout={setLayout}
      />
      {favouriteNotes.length === 0 ?
        (<EmptyState desc="Nothing here yet. Notes you favourite will appear here." />) :
        (<div className={`w-full ${layout === "grid" ? "grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-3" : "grid-cols-1"} grid gap-6`}>
          {
            filteredFavouriteNotes.map((item) => (
              <TodoItem
                key={item._id}
                title={item.title}
                desc={item.description}
                color={item.color}
                createdAt={formateDate(item.createdAt)}
                setFavourite={() => setFavourite(item.isFavourite, item._id)}
                isFavourite={item.isFavourite}
                isTrashed={item.isTrashed}
                onClick={() => navigate(`/dashboard/detail-page/${item._id}`, {
                  state: { from: "favourites" }
                })}
              />
            ))
          }
        </div>
        )}
    </div>
  )
}

export default Favourites
