import React, { useEffect, useState, useRef } from "react";
import { fetchPhotos } from "../api";
import Grid from "./Grid";

const List = () => {
  const perPage = 30;

  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState()
  const [page, setPage] = useState(1)
  const elementRef = useRef(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await fetchPhotos({perPage: perPage, page: page})
      setLoading(false)
      return data;
    } catch(err) {
      setLoading(false)
      setError(true)
    }
  }

  const fetchMoreData = async () => {
    setLoading(true)
    try {
      const data = await fetchPhotos({perPage: perPage, page: page})
      setLoading(false)
      setData(prevData => [...prevData, ...data.images])
    } catch(err) {
      setLoading(false)
      setError(true)
    }
  }
  
  const onIntersection = (entries) => {
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting) {
      if (loading && data.length === limit) return
      fetchMoreData()
    }
  }
  
  // initial fetch
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData({perPage: perPage, page: page});
      setData(data.images)
      setLimit(data.total)
      setPage(prevPage => prevPage + 1)
    }
    getData()
  }, [])

  // load more based on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {threshold: 1})
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  if (error) return <div>Error occured, try again.</div>

  return (
    <>
      <Grid data={data} loading={loading} />
      <div ref={elementRef} style={{height: '50px'}}></div>
      <div style={{height: '50px'}}></div>
    </>
  );
};

export default List;
