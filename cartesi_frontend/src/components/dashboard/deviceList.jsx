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
import { axiosInstance } from "../../axios";

function createData(id, name, shipTo, paymentMethod, status) {
  return { id, name, shipTo, paymentMethod, status };
}
function preventDefault(event) {
  event.preventDefault();
}

export default function DeviceList() {
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
      "Bosh",
      "Kanto",
      "Eclipse Kanto is a modular IoT device for IoT with all home essentials."
    ),
    createData(
      1,
      "BMW",
      "ConnectedDrive",
      "Open data platform for drivers and third-party developers. "
    ),
    createData(
      2,
      "Cropin",
      "Riler",
      "IoT smart agriculture device are designed to help monitor crop fields using sensors and by automating irrigation systems."
    ),
    createData(
      3,
      "Samsung",
      "Smarthing Ts",
      "The SmartThings suite of devices lets you control all your smart home products from your phone."
      // donationSuccessUNESCO
    ),
    createData(
      4,
      "Tulip",
      "Hand",
      "Industry robot arm with computer vision and AI for industrial automation."
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

  return (
    <React.Fragment>
      <Title> Supported IoT devices </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>IoT model</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Anonymized IoT device statistic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">
                <Button color="inherit">link</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
