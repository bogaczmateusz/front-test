import React from 'react'
import GridItem from "./GridItem";

export default function Grid({data, loading}) {
  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexWrap: "wrap" }}>
        {data?.map((item, i) => (
            <GridItem key={`${item.id}-${i}`} image={item.urls.regular} name={item.user.username} />
        ))}
        {loading && (
            <div className="w-full">Loading...</div>
        )}
    </div>
  )
}
