import { useState, useEffect } from "react";
import axios from "axios";

export const GetCalendarInfo = (month, year) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(
          `http://localhost:5000/calendar/?month=${month}&year=${year}`
        );

        setData(result.data);
      } catch (error) {
        setIsError(error.response.data);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url, refresh]);

  return [{ data, isLoading, isError }, setUrl, setRefresh];
};
