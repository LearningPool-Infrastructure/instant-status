import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function useFetch(url: string, reload?: any) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl(token: string) {
    const response = await fetch(url, {
      credentials: "same-origin",
      headers: new Headers({
        authorization: `Bearer ${token}`,
      }),
    });
    const json = await response.json();
    if (response.status !== 200) {
      setData([{ error: "Unauthorised" }]);
    } else {
      setData(json);
    }
    setLoading(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("bearer") || Cookies.get('Auth-Bearer');
    setLoading(true);
    fetchUrl(token);
  }, [reload] || []);

  return [data, loading] as [typeof data, typeof loading];
}

export default useFetch;
