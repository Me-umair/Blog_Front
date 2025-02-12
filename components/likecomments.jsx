import axios from "axios";

async function likecomment2(comid) {
  let userdata = JSON.parse(localStorage.getItem("user"));
  let result = await axios.post(
    `${import.meta.env.VITE_API}/api/v1/blog/commentlike/${comid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${userdata.token}`, // Include the token in the header
      },
    }
  );
  return result.data;
}

export default likecomment2;