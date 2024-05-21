import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button';
import Title from './title';
import axiosInstance from '../../axios';

// import { ethers } from 'ethers';
// import donationAbi from './abi/Donation.json';
// import { requirePropFactory } from '@mui/material';



function createData(id, name, shipTo, paymentMethod, status) {
  return { id, name, shipTo, paymentMethod, status};
}
function preventDefault(event) {
  event.preventDefault();
}




export default function ListDonations() {

  const [contract, setContract] = useState(null);
  const [data, setData] = useState(null);
  const [donationSuccessUNICEF, setDonationSuccessUNICEF] = useState("Status");
  const [donationSuccessUNDP, setDonationSuccessUNDP] = useState("Status");
  const [donationSuccessTrentino, setDonationSuccessTrentino] = useState("Status");
  const [donationSuccessUNESCO, setDonationSuccessUNESCO] = useState("Status");
  const [donationSuccessSOS, setDonationSuccessSOS] = useState("Status");


useEffect(() => {
    const fetchData = async () => {
        try {
          const res = await axiosInstance.get('dashboard/donations/');
          setData(res.data);
       
        } catch (error) {
          console.error('There was an error!', error);
          alert('There was an error!');
        }
      };
    
      fetchData();
  }, []);


  
  return (
    <React.Fragment>
      <Title> Donations </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Create at</TableCell>
            <TableCell>User name</TableCell>
            <TableCell>Supported organization</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row["created_at"]}</TableCell>
              <TableCell>{row["user_name"]}</TableCell>
              <TableCell>{row["organization"]}</TableCell>
              <TableCell>{row["amount"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}