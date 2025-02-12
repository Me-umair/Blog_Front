import axios from "axios";

export default async function addLike(blogid) {
  let userdata = JSON.parse(localStorage.getItem("user"));
  let result = await axios.post(
    `${import.meta.env.VITE_API}/api/v1/blog/like/${blogid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userdata.token}`, // Include the token in the header
      },
    }
  );
  return result.data;
}
