// import { useState, useEffect, useDebugValue } from "react";

// interface FetchData {
//   data: any;
//   loading: boolean;
//   error: any;
// }

// function useFetch(url: string): FetchData {
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<any>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [url]);

//   useDebugValue({ data, loading, error }, (value) =>
//     value
//       ? `Data: ${JSON.stringify(value.data)}, Loading: ${
//           value.loading
//         }, Error: ${value.error}`
//       : "Loading..."
//   );

//   return { data, loading, error };
// }

// export default useFetch;

import { useState, useEffect, useDebugValue } from "react";
import axios, { Method } from "axios";

interface FetchData {
  data: any;
  loading: boolean;
  error: any;
}

function useFetch(url: string, method: Method = "GET", body?: any): FetchData {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const options: any = {
          method,
          url,
          headers: {
            "Content-Type": "application/json",
          },
          data: method !== "GET" ? body : undefined,
        };

        const response = await axios(options);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, method, body]);

  useDebugValue({ data, loading, error }, (value) =>
    value
      ? `Data: ${JSON.stringify(value.data)}, Loading: ${value.loading
      }, Error: ${value.error}`
      : "Loading..."
  );

  return { data, loading, error };
}

export default useFetch;