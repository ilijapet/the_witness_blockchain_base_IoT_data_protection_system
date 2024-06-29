// import axios from "axios";

import { PrintTwoTone } from "@mui/icons-material";

// let config = {
//   method: "get",
//   maxBodyLength: Infinity,
//   url: "http://127.0.0.1:5004/notice",
//   headers: {
//     Accept: "application/json",
//   },
//   maxContentLength: Infinity,
// };

// { method: "get_challenges" }
// axios(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//     console.log("ilija");
//   });

//   const inspect = async (payload) => {
//     const response = await fetch(`${DEFAULT_URL}/${JSON.stringify(payload)}`)

//     if (response.status === 200) {
//         const result = await response.json()
//         console.log(result.reports)
//         return result.reports
//     } else {
//         console.log(await response.text());
//     }
// }
const DEFAULT_URL = "http://127.0.0.1:5004/inspect";

const inspect = async (payload) => {
  console.log(`${DEFAULT_URL}/${JSON.stringify(payload)}`);
  //   const response = await fetch(`${DEFAULT_URL}/${JSON.stringify(payload)}`);
  const response = await fetch(
    "http://127.0.0.1:5004/inspect?method=get_challenges"
  );
  console.log("ispod");
  if (response.status === 200) {
    const result = await response.json();
    console.log(result.reports);
    return result.reports;
  } else {
    console.log(response);
    console.log("bla");
    console.log(await response.text());
  }
};

const results = await inspect({ method: "get_challenges" });
