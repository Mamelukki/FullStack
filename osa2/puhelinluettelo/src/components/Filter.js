import React from 'react'

const Filter = ({ showSearch, handleShowSearch }) => {
  return(
    <form>
      <div>
        rajaa näytettäviä: <input
        value={showSearch} 
        onChange={handleShowSearch}
        />
      </div>
    </form>
  )
}

export default Filter