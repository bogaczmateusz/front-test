import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectList, setList } from "../reducers/app";
import Grid from "./Grid";
import useData from "../hooks/useData";

const List = () => {
  const dispatch = useDispatch()
  const list = useSelector(selectList)

  console.log("Redux: ", list)

  const perPage = 30
  const elementRef = useRef(null)
  
  const [ images, setImages ] = useState([])
  const [ page, setPage ] = useState(1)
  const [ totalPages, setTotalPages ] = useState(0)
  const { data, isLoading, isError } = useData({ perPage: perPage, page: page })

  // setup intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0]
      if (firstEntry.isIntersecting) {
        setPage(prevPage => prevPage + 1)
      }
    })
    
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  // fetch and put data into state
  useEffect(() => {
    if (data) {
      setImages(prevData => [...prevData, ...data.images])
      setTotalPages(Math.ceil(data.total / perPage))
    }
  }, [data])

  // store data in redux
  useEffect(() => {
    dispatch(setList(images))
  }, [images])

  if (isError) return <div>Error occured, try again.</div>

  return (
    <>
      <Grid data={images} loading={isLoading} />
      {page !== totalPages && (
        <div ref={elementRef} style={{height: "20px", display: isLoading ? "none" : "block"}}></div>
      )}
    </>
  );
};

export default List;
