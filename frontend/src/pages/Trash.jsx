import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import TodoItem from '../components/TodoItem'
import { daysLeftInTrash, formateDate, timeAgo } from '../calculations'
import PageHeader from '../components/PageHeader'

function Trash() {
  const { listItem, setFavourite, layout, setLayout, searchQuery } = useOutletContext()

  const trashedNotes = listItem.filter(item => item.isTrashed)
  const filteredTrashedNotes = trashedNotes.filter(item=> item.title.toLowerCase().includes(searchQuery.toLowerCase())||item.description.toLowerCase().includes(searchQuery.toLowerCase())) || trashedNotes;

  return (
    <div className="flex flex-col justify-start items-center gap-4 w-full py-2 px-6 mt-12 tablet:mt-0 mb-18 tablet:mb-0">
      <PageHeader
        title="Trash"
        description="Items in trash are safely preserved and automatically cleared after 30 days."
        layout={layout}
        setLayout={setLayout}
      />
      {trashedNotes.length === 0 ?
        (<EmptyState desc="Nothing here yet. Notes you delete will be moved to the trash."/>) :
        (<div className={`w-full ${layout==="grid"? "grid-cols-1 mobile:grid-cols-2 laptop:grid-cols-3": "grid-cols-1"} grid gap-6`}>
          {
            filteredTrashedNotes.map((item) => (
              <TodoItem
                key={item._id}
                title={item.title}
                desc={item.description}
                color={item.color}
                createdAt={`${daysLeftInTrash(item.trashedAt)} days left`}
                setFavourite={() => setFavourite(item.isFavourite, item._id)}
                isTrashed={item.isTrashed}
                isFavourite={item.isFavourite}
              />
            ))
          }
        </div>
        )}
    </div>
  )
}

export default Trash
