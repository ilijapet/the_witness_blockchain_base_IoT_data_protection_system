import * as React from "react";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "./title";
import axiosInstance from "../../axios";

import { ethers } from "ethers";
import donationAbi from "./abi/Donation.json";

function createData(id, name, shipTo, paymentMethod, status) {
  return { id, name, shipTo, paymentMethod, status };
}
function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [contract, setContract] = useState(null);
  const [donationSuccessUNICEF, setDonationSuccessUNICEF] = useState("Status");
  const [donationSuccessUNDP, setDonationSuccessUNDP] = useState("Status");
  const [donationSuccessTrentino, setDonationSuccessTrentino] =
    useState("Status");
  const [donationSuccessUNESCO, setDonationSuccessUNESCO] = useState("Status");
  const [donationSuccessSOS, setDonationSuccessSOS] = useState("Status");

  const rows = [
    createData(
      0,
      "UNICEF",
      "New York, United States",
      "Supporing children in need",
      donationSuccessUNICEF
    ),
    createData(
      1,
      "UNDP",
      "New York, United States",
      "International development",
      donationSuccessUNDP
    ),
    createData(
      2,
      "Trentino con I Balcani",
      "Trentino, IT",
      "Regional cooperation",
      donationSuccessTrentino
    ),
    createData(
      3,
      "UNESCO",
      "Paris, France",
      "Culture and education",
      donationSuccessUNESCO
    ),
    createData(
      4,
      "SOS Children’s Villages",
      "Vienna, Austria",
      "Children without parental care",
      donationSuccessSOS
    ),
  ];

  const switcher = (prop, status) => {
    switch (prop) {
      case 0:
        setDonationSuccessUNICEF(status);
        break;
      case 1:
        setDonationSuccessUNDP(status);
        break;
      case 2:
        setDonationSuccessTrentino(status);
        break;
      case 3:
        setDonationSuccessUNESCO(status);
        break;
      case 4:
        setDonationSuccessSOS(status);
        break;
      default:
        break;
    }
  };

  const donate = async (prop) => {
    console.log(prop);
    if (window.ethereum) {
      const result = await window.ethereum.request({ method: "eth_accounts" });
      if (result.length > 0) {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        const currentSigner = await ethersProvider.getSigner();
        const contractDonation = new ethers.Contract(
          "0x1fA99bB28cc817aAc2B5D35bE56c0121DAdC8E0F",
          donationAbi["abi"],
          currentSigner
        );
        setContract(contractDonation);
        console.log(contractDonation);
        try {
          const amount = ethers.parseEther("0.1");
          const tx = await contractDonation.donate({ value: amount });
          switcher(prop.id, "Pending");
          const receipt = await ethersProvider.waitForTransaction(tx.hash);
          if (receipt.status === 1) {
            console.log("Transaction was successful");
            switcher(prop.id, "Success");
            const res = await axiosInstance.post("dashboard/donations/", {
              created_at: "",
              user_identifier: "",
              user_name: "",
              organization: prop.name,
              amount: "0.1",
            });
            console.log(res.data);
          } else {
            switcher(prop, "Failed");
            console.log("Transaction failed");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Please connect your wallet");
      }
    }
  };

  return (
    <React.Fragment>
      <Title> List of organizations you can support </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {/* <TableCell>Date</TableCell> */}
            <TableCell>Organization name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Donate 0.1 ETH to organziation</TableCell>
            <TableCell align="right">Payment status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">
                <Button color="inherit" onClick={() => donate(row)}>
                  Donate{" "}
                </Button>
              </TableCell>
              <TableCell align="right"> {row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
